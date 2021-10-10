import { addToUndo, accumulator } from '../controller/handlers/undo';
import * as actions from '../controller/actions/actionCreators';

export const skipActions = [
  actions.loadStateStorage.toString(),
  actions.stateLoad.toString(),
  actions.undo.toString(),
  actions.redo.toString(),
];

export default function undoReducer(reducer) {
  return (state, action) => {
    /* eslint-disable prefer-const */
    let { undo, ...lState } = state || [];
    const rState = reducer(state, action);

    if (!skipActions.includes(action.type) && lState && undo) {
      const changes = accumulator.diff(lState, rState);
      if (changes.length > 0) {
        undo = addToUndo(undo, changes);
        accumulator.clear();
      }
      return { ...rState, undo };
    }
    return rState;
  };
}
