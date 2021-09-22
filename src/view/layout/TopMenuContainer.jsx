import { connect } from 'react-redux';
import { jump, lock, undo, redo } from '../../redux-deep-diff';
import TopMenu from './TopMenu';

const mapDispatchToProps = (dispatch) => ({
  jumpCmd: (index) => dispatch(jump(index)),
  lockCmd: () => dispatch(lock()),
  undoCmd: () => dispatch(undo()),
  redoCmd: () => dispatch(redo()),
});

const mapStateToProps = (state) => ({
  history: state.history,
  windowDimensions: state.layout.windowDimensions,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
