import { connect } from 'react-redux';
import TopMenu from './TopMenu';
import {
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
});

const mapStateToProps = (state) => ({
  history: state.history,
  windowDimensions: state.layout.windowDimensions,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
