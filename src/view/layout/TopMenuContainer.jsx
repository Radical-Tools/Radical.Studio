import { connect } from 'react-redux';
import TopMenu from './TopMenu';
import {
  historyChangeName,
  historyJump,
  historyLock,
  historyRedo,
  historyUndo,
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
});

const mapStateToProps = (state) => ({
  history: state.project.history,
  windowDimensions: state.layout.windowDimensions,
  historyEnabled:
    !window.isExtension &&
    (state.layout.mode === LAYOUT_MODE.EDIT ||
      state.layout.mode === LAYOUT_MODE.PRESENTATION),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
