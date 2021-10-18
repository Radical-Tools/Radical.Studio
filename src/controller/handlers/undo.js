import clone from 'clone-deep';
import { applyChanges, revertChanges } from '../../utils/history/util';
import DiffAccumulator from '../../utils/history/acumulator';
import { UNDO_LIMIT } from '../../app/consts';

export const initialState = {
  undo: { prev: [], next: [], limit: UNDO_LIMIT },
};

export function addToUndo(undo, addition) {
  return addition.length === 0
    ? undo
    : {
        ...undo,
        prev: [addition, ...undo.prev].slice(
          0,
          undo.limit || undo.prev.length + 1
        ),
        next: [],
      };
}

const jumpToPrevUndo = (undo, offset = 1) => {
  const normalizedOffset = Math.min(undo.prev.length, offset);
  return {
    ...undo,
    prev: undo.prev.slice(normalizedOffset),
    next: [
      ...undo.prev.slice(0, normalizedOffset).reverse(),
      ...undo.next,
    ].slice(0, undo.limit || undo.next.length + normalizedOffset),
  };
};

const jumpToNextUndo = (undo, offset = 1) => {
  const normalizedOffset = Math.min(undo.next.length, offset);

  return {
    ...undo,
    prev: [
      ...undo.next.slice(0, normalizedOffset).reverse(),
      ...undo.prev,
    ].slice(0, undo.limit || undo.prev.length + normalizedOffset),
    next: undo.next.slice(normalizedOffset),
  };
};

export const undo = (state) => ({
  ...revertChanges(clone(state), state.undo.prev[0]),
  undo: jumpToPrevUndo(state.undo),
});

export const redo = (state) => ({
  ...applyChanges(clone(state), state.undo.next[0]),
  undo: jumpToNextUndo(state.undo),
});

const prefilter = (path, key) => key === 'undo';

export const accumulator = new DiffAccumulator({
  flatten: () => false,
  prefilter,
});
