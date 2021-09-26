import clone from 'clone-deep';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import DiffAccumulator from '../redux-deep-diff/acumulator';
import { UNDO, REDO, JUMP, CLEAR, LOCK } from '../redux-deep-diff';
import {
  applyChanges,
  applyDiffs,
  revertChanges,
  revertDiffs,
} from '../redux-deep-diff/util';
import { updateStepHistory } from '../controller/handlers/presentation';
import { fixBrokenView } from '../controller/handlers/viewModel';

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
  const offsetNormalized = Math.min(history.prev.length, offset);

  return {
    ...history,
    prev: history.prev.slice(offsetNormalized),
    next: [
      ...history.prev.slice(0, offsetNormalized).reverse(),
      ...history.next,
    ].slice(0, history.limit || history.next.length + offsetNormalized),
  };
}

function jumpToNextHistory(history, offset = 1) {
  const offsetNormalized = Math.min(history.next.length, offset);

  return {
    ...history,
    prev: [
      ...history.next.slice(0, offsetNormalized).reverse(),
      ...history.prev,
    ].slice(0, history.limit || history.prev.length + offsetNormalized),
    next: history.next.slice(offsetNormalized),
  };
}

export default function historyReducer(reducer, config = {}) {
  const {
    key = 'history',
    limit = 0,
    skipAction = () => false,
    initialState = { prev: [], next: [] },
    ignoreInit = true,
    flatten = () => false,
    prefilter = () => false,
  } = config;

  const accum = new DiffAccumulator({ flatten, prefilter });

  return (rawState, action) => {
    let { [key]: history } = rawState || {};
    history = history || { ...initialState, limit };

    const lhs = rawState;
    const rhs = reducer(lhs, action);
    let nextState = rhs || {};
    let changes;
    let diffs;
    let stepName;
    let index;

    switch (action.type) {
      case 'state/load/storage':
        history = rhs[key];
        break;

      case 'presentation/step/goto':
        stepName =
          rhs.presentationModel.presentations[rhs.presentationModel.current]
            .steps[
            rhs.presentationModel.presentations[rhs.presentationModel.current]
              .currentStepIndex
          ].properties.historyStepName;
        index = history.prev.findIndex((item) => item.name === stepName);
        if (index !== -1) {
          diffs = history.prev
            .slice(0, Math.abs(index))
            .map((item) => item.changes);
          nextState = revertDiffs(clone(lhs), diffs);
          history = jumpToPrevHistory(history, Math.abs(index));
        } else {
          index = history.next.findIndex((item) => item.name === stepName) + 1;
          diffs = history.next
            .slice(0, Math.abs(index))
            .map((item) => item.changes);
          nextState = applyDiffs(clone(lhs), diffs);
          history = jumpToNextHistory(history, index);
        }

        if (index !== 0) {
          nextState = flow(
            set(['model'], nextState.model),
            set(['viewModel'], nextState.viewModel),
            set(['viewModel', 'current'], rhs.viewModel.current),
            set(
              ['viewModel', 'views', rhs.viewModel.current, 'alignment'],
              rhs.viewModel.views[rhs.viewModel.current].alignment
            )
          )(rhs);
        } else {
          nextState = rhs;
        }
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

        nextState = updateStepHistory({ ...nextState, [key]: history });
        nextState = fixBrokenView(nextState);

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
              changes,
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
            changes,
            isLocked: false,
            name: history.prev.length + 1,
          });
          accum.clear();
        }
    }

    return { ...nextState, [key]: history };
  };
}
