import clone from 'clone-deep';
import set from 'lodash/fp/set';
import DiffAccumulator from './acumulator';
import { UNDO, REDO, JUMP, CLEAR, LOCK, JUMPABSOLUTE } from './actions';
import { applyChanges, applyDiffs, revertChanges, revertDiffs } from './util';
import { v4 as uuidv4 } from 'uuid';
import { updateStepHistory } from '../controller/handlers/presentation';

function addToHistory(history, addition) {
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

function jumpToPrevHistory(history, offset = 1) {
  offset = Math.min(history.prev.length, offset);

  return {
    ...history,
    prev: history.prev.slice(offset),
    next: [...history.prev.slice(0, offset).reverse(), ...history.next].slice(
      0,
      history.limit || history.next.length + offset
    ),
  };
}

function jumpToNextHistory(history, offset = 1) {
  offset = Math.min(history.next.length, offset);

  return {
    ...history,
    prev: [...history.next.slice(0, offset).reverse(), ...history.prev].slice(
      0,
      history.limit || history.prev.length + offset
    ),
    next: history.next.slice(offset),
  };
}

export default function diff(reducer, config = {}) {
  const {
    key = 'history',
    limit = 0,
    skipAction = () => false,
    initialState = { prev: [], next: [] },
    ignoreInit = true,
    flatten = () => false,
    prefilter = () => false,
  } = config;

  // this will accumulate and merge diffs until `accum.clear()` is called
  let accum = new DiffAccumulator({ flatten, prefilter });

  return (rawState, action) => {
    let { [key]: history, ...state } = rawState || {};
    history = history || { ...initialState, limit };

    // let lhs = rawState && state;
    let lhs = rawState;
    let rhs = reducer(lhs, action);
    let nextState = rhs || {};
    let changes, diffs;

    switch (action.type) {
      case 'state/load/storage':
        history = rhs[key];
        break;
      case UNDO:
        nextState = revertChanges(clone(lhs), history.prev[0].changes);
        history = jumpToPrevHistory(history);

        nextState = updateStepHistory(nextState);
        break;

      case REDO:
        nextState = applyChanges(clone(lhs), history.next[0].changes);
        history = jumpToNextHistory(history);
        nextState = updateStepHistory(nextState);
        break;

      case JUMPABSOLUTE:
        break;

      case JUMP:
        // apply a subset of previous diffs
        if (action.index < 0) {
          diffs = history.prev
            .slice(0, Math.abs(action.index))
            .map((item) => item.changes);
          nextState = revertDiffs(clone(lhs), diffs);
          history = jumpToPrevHistory(history, Math.abs(action.index));

          // apply a subset of future diffs
        } else if (action.index > 0) {
          diffs = history.next
            .slice(0, Math.abs(action.index))
            .map((item) => item.changes);
          nextState = applyDiffs(clone(lhs), diffs);
          history = jumpToNextHistory(history, action.index);
        }

        nextState = updateStepHistory(nextState);

        break;

      case LOCK:
        changes = [];
        if (history.next.length === 0) {
          const firstLockedIndex =
            history.prev.findIndex((item) => item.isLocked) === -1
              ? history.prev.length
              : history.prev.findIndex((item) => item.isLocked);

          const lastLockedState = revertDiffs(
            clone(lhs),
            history.prev.slice(0, firstLockedIndex).map((item) => item.changes)
          );

          changes = accum.diff(lastLockedState, lhs);

          history = {
            ...history,
            prev: history.prev.slice(firstLockedIndex),
            next: [],
          };

          if (changes.length > 0) {
            history = addToHistory(history, {
              changes: changes,
              isLocked: true,
              name: history.prev.length + 1,
            });
            accum.clear();
          }
        }

        break;

      case CLEAR:
        history = { ...initialState, limit };
        accum.clear();
        break;

      default:
        changes = rawState || !ignoreInit ? accum.diff(lhs, rhs) : [];

        if (!skipAction(action) && changes.length > 0) {
          history = addToHistory(history, {
            changes: changes,
            isLocked: false,
            name: history.prev.length + 1,
          });
          accum.clear();
        }
    }

    return { ...nextState, [key]: history };
  };
}
