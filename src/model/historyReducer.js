import {
  addToHistory,
  historyAccumulator,
} from '../controller/handlers/history';
import * as actions from '../controller/actions/actionCreators';

export const skipActions = [
  actions.loadStateStorage.toString(),
  actions.historyUndo.toString(),
  actions.historyRedo.toString(),
  actions.historyLock.toString(),
  actions.historyJump.toString(),
  actions.presentationSetGoTo.toString(),
];

export default function historyReducer(reducer) {
  return (state, action) => {
    let { history } = state || [];
    const rState = reducer(state, action);

    if (!skipActions.includes(action.type) && state) {
      const changes = historyAccumulator.diff(
        { model: state.model, viewModel: state.viewModel },
        { model: rState.model, viewModel: rState.viewModel }
      );
      if (changes.length > 0) {
        history = addToHistory(history, {
          changes: historyAccumulator.diff(state, rState),
          isLocked: false,
          name: history.prev.length + 1,
        });
        historyAccumulator.clear();
      }
      return { ...rState, history };
    }
    return rState;
  };
}
