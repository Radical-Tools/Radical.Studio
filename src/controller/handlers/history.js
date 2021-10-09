import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import identity from 'lodash/fp/identity';
import findLastIndex from 'lodash/fp/findLastIndex';
import clone from 'clone-deep';
import {
  applyChanges,
  applyDiffs,
  revertChanges,
  revertDiffs,
} from '../../utils/history/util';
import DiffAccumulator from '../../utils/history/acumulator';
import { HISTORY_LIMIT } from '../../app/consts';

export const initialState = {
  history: { prev: [], next: [], limit: HISTORY_LIMIT, count: 0 },
};

export function addToHistory(history, addition) {
  return addition.length === 0
    ? history
    : {
        ...history,
        prev: [addition, ...history.prev].slice(0, history.prev.length + 1),
        next: [],
        count: addition.isLocked ? history.count : history.count + 1,
        id: 'latest',
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
    ].slice(0, history.next.length + normalizedOffset),
  };
};

const jumpToNextHistory = (history, offset = 1) => {
  const normalizedOffset = Math.min(history.next.length, offset);

  return {
    ...history,
    prev: [
      ...history.next.slice(0, normalizedOffset).reverse(),
      ...history.prev,
    ].slice(0, history.prev.length + normalizedOffset),
    next: history.next.slice(normalizedOffset),
  };
};

export const jump = (state, payload) => {
  const { model, viewModel } =
    payload.index < 0
      ? revertDiffs(
          clone(state),
          state.history.prev
            .slice(0, Math.abs(payload.index))
            .map((item) => item.changes)
        )
      : applyDiffs(
          clone(state),
          state.history.next
            .slice(0, Math.abs(payload.index))
            .map((item) => item.changes)
        );

  const history =
    payload.index < 0
      ? jumpToPrevHistory(state.history, Math.abs(payload.index))
      : jumpToNextHistory(state.history, payload.index);

  return flow(
    set(['model'], model),
    set(['viewModel'], viewModel),
    viewModel.views[viewModel.current]
      ? set(
          ['viewModel', 'views', state.viewModel.current, 'alignment'],
          state.viewModel.views[state.viewModel.current].alignment
        )
      : identity,
    set(['history'], history),
    set(['viewModel', 'current'], state.viewModel.current)
  )(state);
};

export const jumpById = (state, payload) => {
  let index = -state.history.prev.findIndex((item) => item.id === payload.id);
  if (index > 0) {
    index =
      findLastIndex((item) => item.id === payload.id, state.history.next) + 1;
  }

  return index !== 0 ? jump(state, { index }) : state;
};

export const jumpByPresentation = (state) => {
  const presentation =
    state.presentationModel.presentations[state.presentationModel.current];
  const stepId =
    presentation.steps[presentation.currentStepIndex].properties.historyStepId;
  return jumpById(state, { stepId });
};

export const undo = (state) => ({
  ...revertChanges(clone(state), state.history.prev[0].changes),
  history: jumpToPrevHistory(state.history),
});

export const redo = (state) => ({
  ...applyChanges(clone(state), state.history.next[0].changes),
  history: jumpToNextHistory(state.history),
});

export const changeName = (state, payload) =>
  set(['history', 'prev', 0, 'name'], payload.name, state);

export const clear = (state) => set(['history'], { ...initialState }, state);

const prefilter = (path, key) =>
  (path.length === 0 && ['model', 'viewModel'].indexOf(key) === -1) ||
  key === 'current' ||
  key === 'alignment' ||
  key === 'isSelected' ||
  key === 'possibleRelations';

export const historyAccumulator = new DiffAccumulator({
  flatten: () => false,
  prefilter,
});
export const lock = (state, isLocked = true) => {
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
      count: 0,
    };

    if (changes.length > 0) {
      history = addToHistory(history, {
        changes,
        isLocked,
        name: `v${history.prev.length + 1}`,
        id: uuidv4(),
      });
      historyAccumulator.clear();
    }

    return set(['history'], history, state);
  }

  return state;
};

export const rollback = (state) => set(['history', 'next'], [], state);

export const updateHistory = (beforeState, state, history) => {
  const lastState = revertDiffs(clone(beforeState), history.prev[0].changes);

  historyAccumulator.clear();
  const changes = historyAccumulator.diff(lastState, state);
  historyAccumulator.clear();

  return set(['prev', 0, 'changes'], changes, history);
};
