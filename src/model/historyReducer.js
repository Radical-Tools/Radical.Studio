import {
  addToHistory,
  historyAccumulator,
  merge,
  updateHistory,
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
  actions.undo.toString(),
  actions.redo.toString(),
  actions.layoutAdminDialogToggle.toString(),
];

export default function historyReducer(reducer) {
  return (state, action) => {
    const { history } = state?.project || [];
    const rState = reducer(state, action);

    if (!skipActions.includes(action.type) && state && history) {
      const changes = historyAccumulator.diff(state, rState);
      if (changes.length > 0) {
        if (history.next.filter((item) => item.isLocked).length === 0) {
          const history2 = addToHistory(history, {
            changes,
            isLocked: false,
            name: `Latest (${history.count + 1})`,
          });
          historyAccumulator.clear();
          if (history2.count === history2.limit)
            return merge(
              { ...rState, project: { ...rState.project, history: history2 } },
              false
            );

          return {
            ...rState,
            project: { ...rState.project, history: history2 },
          };
        }

        if (history.prev.length > 0) {
          return {
            ...rState,
            project: {
              ...rState.project,
              history: updateHistory(state, rState, history),
            },
          };
        }
      }
    }
    return rState;
  };
}
