import { connect } from 'react-redux';
import TopMenu from './TopMenu';
import {
  historyChangeName,
  historyJump,
  historyLock,
  historyRedo,
  historyUndo,
  undo,
  redo,
  historyRollback,
} from '../../controller/actions/actionCreators';
import { LAYOUT_MODE } from '../../app/consts';

const mapDispatchToProps = (dispatch) => ({
  jumpCmd: (index) => dispatch(historyJump(index)),
  lockCmd: () => dispatch(historyLock()),
  historyUndoCmd: () => dispatch(historyUndo()),
  historyRedoCmd: () => dispatch(historyRedo()),
  historyRollbackCmd: () => dispatch(historyRollback()),
  changeNameCmd: (name) => dispatch(historyChangeName(name)),
  undoCmd: () => dispatch(undo()),
  redoCmd: () => dispatch(redo()),
});

const mapStateToProps = (state) => ({
  history: state.history,
  windowDimensions: state.layout.windowDimensions,
  historyEnabled:
    state.layout.mode === LAYOUT_MODE.EDIT ||
    state.layout.mode === LAYOUT_MODE.PRESENTATION,
  isUndoFirst: state.undo.prev.length === 0,
  isUndoLast: state.undo.next.length === 0,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
