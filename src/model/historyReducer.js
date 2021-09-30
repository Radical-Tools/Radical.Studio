import {
  addToHistory,
  historyAccumulator,
  lock,
} from '../controller/handlers/history';
import * as actions from '../controller/actions/actionCreators';

export const skipActions = [
  actions.loadStateStorage.toString(),
  actions.stateLoad.toString(),
  actions.historyUndo.toString(),
  actions.historyRedo.toString(),
  actions.historyLock.toString(),
  actions.historyJump.toString(),
  actions.presentationSetGoTo.toString(),
  actions.historyChangeName.toString(),
];

export default function historyReducer(reducer) {
  return (state, action) => {
    let { history } = state || [];
    const rState = reducer(state, action);

    if (!skipActions.includes(action.type) && state) {
      const changes = historyAccumulator.diff(state, rState);
      if (changes.length > 0) {
        history = addToHistory(history, {
          changes,
          isLocked: false,
          name: `v${history.prev.length + 1}`,
        });
        historyAccumulator.clear();
      }

      if (history.count === history.limit)
        return lock({ ...rState, history }, false);

      return { ...rState, history };
    }
    return rState;
  };
}
