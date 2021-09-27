import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import clone from 'clone-deep';
import {
  applyChanges,
  applyDiffs,
  revertChanges,
  revertDiffs,
} from '../../utils/history/util';
import DiffAccumulator from '../../utils/history/acumulator';

export const initialState = { history: { prev: [], next: [] } };
const limit = 100;

export function addToHistory(history, addition) {
  return addition.length === 0
    ? history
    : {
        ...history,
        prev: [addition, ...history.prev].slice(
          0,
          history.limit || history.prev.length + 1
        ),
        next: [],
      };
}

const jumpToPrevHistory = (history, offset = 1) => {
  const normalizedOffset = Math.min(history.prev.length, offset);

  return {
    ...history,
    prev: history.prev.slice(normalizedOffset),
    next: [
      ...history.prev.slice(0, normalizedOffset).reverse(),
      ...history.next,
    ].slice(0, history.limit || history.next.length + normalizedOffset),
  };
};

const jumpToNextHistory = (history, offset = 1) => {
  const normalizedOffset = Math.min(history.next.length, offset);

  return {
    ...history,
    prev: [
      ...history.next.slice(0, normalizedOffset).reverse(),
      ...history.prev,
    ].slice(0, history.limit || history.prev.length + normalizedOffset),
    next: history.next.slice(normalizedOffset),
  };
};

export const jump = (state, payload) => {
  if (payload.index < 0) {
    const { model, viewModel } = revertDiffs(
      clone(state),
      state.history.prev
        .slice(0, Math.abs(payload.index))
        .map((item) => item.changes)
    );
    return flow(
      set(['model'], model),
      set(['viewModel'], viewModel),
      set(
        ['viewModel', 'views', state.viewModel.current, 'alignment'],
        state.viewModel.views[state.viewModel.current].alignment
      ),
      set(
        ['history'],
        jumpToPrevHistory(state.history, Math.abs(payload.index))
      ),
      set(['viewModel', 'current'], state.viewModel.current)
    )(state);
  }

  const { model, viewModel } = applyDiffs(
    clone(state),
    state.history.next
      .slice(0, Math.abs(payload.index))
      .map((item) => item.changes)
  );

  return flow(
    set(['model'], model),
    set(['viewModel'], viewModel),
    set(
      ['viewModel', 'views', state.viewModel.current, 'alignment'],
      state.viewModel.views[state.viewModel.current].alignment
    ),
    set(['history'], jumpToNextHistory(state.history, payload.index)),
    set(['viewModel', 'current'], state.viewModel.current)
  )(state);
};

export const jumpByName = (state, payload) => {
  let index = -state.history.prev.findIndex(
    (item) => item.name === payload.stepName
  );
  if (index > 0) {
    index =
      state.history.next.findIndex((item) => item.name === payload.stepName) +
      1;
  }

  return index !== 0 ? jump(state, { index }) : state;
};

export const jumpByPresentation = (state) => {
  const stepName =
    state.presentationModel.presentations[state.presentationModel.current]
      .steps[
      state.presentationModel.presentations[state.presentationModel.current]
        .currentStepIndex
    ].properties.historyStepName;

  return jumpByName(state, { stepName });
};

export const undo = (state) => ({
  ...revertChanges(clone(state), state.history.prev[0].changes),
  history: jumpToPrevHistory(state.history),
});

export const redo = (state) => ({
  ...applyChanges(clone(state), state.history.next[0].changes),
  history: jumpToNextHistory(state.history),
});

export const clear = (state) =>
  set(['history'], { ...initialState, limit }, state);

const prefilter = (path, key) =>
  (path.length === 0 && ['model', 'viewModel'].indexOf(key) === -1) ||
  key === 'current' ||
  key === 'alignment';

export const historyAccumulator = new DiffAccumulator({
  flatten: () => false,
  prefilter,
});
export const lock = (state) => {
  let changes;
  if (state.history.next.length === 0) {
    const firstLockedIndex =
      state.history.prev.findIndex((item) => item.isLocked) === -1
        ? state.history.prev.length
        : state.history.prev.findIndex((item) => item.isLocked);

    const lastLockedState = revertDiffs(
      clone(state),
      state.history.prev.slice(0, firstLockedIndex).map((item) => item.changes)
    );

    changes = historyAccumulator.diff(lastLockedState, state);

    let history = {
      ...state.history,
      prev: state.history.prev.slice(firstLockedIndex),
      next: [],
    };

    if (changes.length > 0) {
      history = addToHistory(history, {
        changes,
        isLocked: true,
        name: history.prev.length + 1,
      });
      historyAccumulator.clear();
    }

    return set(['history'], history, state);
  }

  return state;
};