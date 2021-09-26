import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import clone from 'clone-deep';
import {
  applyChanges,
  applyDiffs,
  revertChanges,
  revertDiffs,
} from '../../redux-deep-diff/util';

const initialState = { prev: [], next: [] };
const limit = 100;

const jumpToPrevHistory = (history, offset = 1) => {
  const normalizedOffset = Math.min(history.prev.length, offset);

  return {
    ...history,
    prev: history.prev.slice(normalizedOffset),
    next: [...history.prev.slice(0, normalizedOffset).reverse(), ...history.next].slice(
      0,
      history.limit || history.next.length + normalizedOffset
    ),
  };
};

const jumpToNextHistory = (history, offset = 1) => {
  const normalizedOffset = Math.min(history.next.length, offset);

  return {
    ...history,
    prev: [...history.next.slice(0, normalizedOffset).reverse(), ...history.prev].slice(
      0,
      history.limit || history.prev.length + normalizedOffset
    ),
    next: history.next.slice(normalizedOffset),
  };
};

export const jump = (state, payload) =>
  payload.index < 0
    ? flow(
        set(
          [],
          revertDiffs(
            state,
            state.history.prev
              .slice(0, Math.abs(payload.index))
              .map((item) => item.changes)
          )
        ),
        set(
          'history',
          jumpToPrevHistory(state.history, Math.abs(payload.index))
        )
      )(state)
    : flow(
        set(
          [],
          applyDiffs(
            state,
            state.history.next
              .slice(0, Math.abs(payload.index))
              .map((item) => item.changes)
          )
        ),
        set('history', jumpToNextHistory(state.history, payload.index))
      )(state);

export const jumpByName = (state, payload) => {
  let index = -state.history.prev.findIndex(
    (item) => item.name === payload.stepName
  );
  if (index > 0) {
    index =
      state.history.next.findIndex((item) => item.name === payload.stepName) +
      1;
  }

  return jump(state, { index });
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

export const undo = (state) => {
  const newState = flow(
    set(['history'], jumpToPrevHistory(state.history)),
  )(state);

  return {...newState, ...revertChanges(clone(state), state.history.prev[0].changes)}
}


export const redo = (state) => {
  const newState = flow(
    set(['history'], jumpToNextHistory(state.history)),
  )(state);

  return {...newState, ...applyChanges(clone(state), state.history.next[0].changes)}



}

export const clear = (state) =>
  set(['history'], { ...initialState, limit }, state);
