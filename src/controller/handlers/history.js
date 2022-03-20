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
  const newState =
    payload.index < 0
      ? revertDiffs(
          clone(state),
          state.project.history.prev
            .slice(0, Math.abs(payload.index))
            .map((item) => item.changes)
        )
      : applyDiffs(
          clone(state),
          state.project.history.next
            .slice(0, Math.abs(payload.index))
            .map((item) => item.changes)
        );
  const { model, viewModel } = newState.project;
  const history =
    payload.index < 0
      ? jumpToPrevHistory(state.project.history, Math.abs(payload.index))
      : jumpToNextHistory(state.project.history, payload.index);

  return flow(
    set(['project', 'model'], model),
    set(['project', 'viewModel'], viewModel),
    viewModel.views[viewModel.current]
      ? set(
          [
            'project',
            'viewModel',
            'views',
            state.project.viewModel.current,
            'alignment',
          ],
          state.project.viewModel.views[state.project.viewModel.current]
            .alignment
        )
      : identity,
    set(['project', 'history'], history),
    set(['project', 'viewModel', 'current'], state.project.viewModel.current)
  )(state);
};

export const jumpById = (state, payload) => {
  if (payload.id === 'initial') {
    return jump(state, { index: -state.project.history.prev.length });
  }

  let index = -state.project.history.prev.findIndex(
    (item) => item.id === payload.id
  );
  if (index > 0) {
    index =
      findLastIndex(
        (item) => item.id === payload.id,
        state.project.history.next
      ) + 1;
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

export const undo = (state) => {
  const revertedState = revertChanges(
    clone(state),
    state.project.history.prev[0].changes
  );
  return {
    ...revertedState,
    project: {
      ...revertedState.project,
      history: jumpToPrevHistory(state.project.history),
    },
  };
};

export const redo = (state) => {
  const appliedState = applyChanges(
    clone(state),
    state.project.history.next[0].changes
  );
  return {
    ...appliedState,
    project: {
      ...appliedState.project,
      history: jumpToNextHistory(state.project.history),
    },
  };
};

export const changeName = (state, payload) =>
  set(['project', 'history', 'prev', 0, 'name'], payload.name, state);

export const clear = (state) =>
  set(['project', 'history'], { ...initialState }, state);

const prefilter = (path, key) =>
  (path.length === 0 && ['project'].indexOf(key) === -1) ||
  (path.length === 1 && ['model', 'viewModel'].indexOf(key) === -1) ||
  key === 'current' ||
  key === 'alignment' ||
  key === 'isSelected' ||
  key === 'possibleRelations' ||
  key === 'linkingMode';

export const historyAccumulator = new DiffAccumulator({
  flatten: () => false,
  prefilter,
});
export const merge = (state, isLocked = true) => {
  let changes;
  if (state.project.history.next.length === 0) {
    const firstLockedIndex =
      state.project.history.prev.findIndex((item) => item.isLocked) === -1
        ? state.project.history.prev.length
        : state.project.history.prev.findIndex((item) => item.isLocked);

    const lastLockedState = revertDiffs(
      clone(state),
      state.project.history.prev
        .slice(0, firstLockedIndex)
        .map((item) => item.changes)
    );

    changes = historyAccumulator.diff(lastLockedState, state);

    let history = {
      ...state.project.history,
      prev: state.project.history.prev.slice(firstLockedIndex),
      next: [],
      count: 0,
    };

    if (changes.length > 0) {
      history = addToHistory(history, {
        changes,
        isLocked,
        name: isLocked
          ? `v${history.prev.length + 1}`
          : `Latest (${history.count + 1})`,
        id: uuidv4(),
      });
      historyAccumulator.clear();
    }

    return set(['project', 'history'], history, state);
  }

  return state;
};

export const rollback = (state) =>
  flow(
    set(['project', 'history', 'next'], []),
    set(['project', 'history', 'count'], 0)
  )(state);

export const updateHistory = (beforeState, state, history) => {
  const lastState = revertChanges(clone(beforeState), history.prev[0].changes);

  historyAccumulator.clear();
  const changes = historyAccumulator.diff(lastState, state);
  historyAccumulator.clear();

  return set(['prev', 0, 'changes'], changes, history);
};
