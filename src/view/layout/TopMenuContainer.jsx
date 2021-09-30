import { connect } from 'react-redux';
import TopMenu from './TopMenu';
import {
  historyChangeName,
  historyJump,
  historyLock,
  historyRedo,
  historyUndo,
} from '../../controller/actions/actionCreators';

const mapDispatchToProps = (dispatch) => ({
  jumpCmd: (index) => dispatch(historyJump(index)),
  lockCmd: () => dispatch(historyLock()),
  undoCmd: () => dispatch(historyUndo()),
  redoCmd: () => dispatch(historyRedo()),
  changeNameCmd: (name) => dispatch(historyChangeName(name)),
});

const mapStateToProps = (state) => ({
  history: state.history,
  windowDimensions: state.layout.windowDimensions,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
