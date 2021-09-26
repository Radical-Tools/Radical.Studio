import { connect } from 'react-redux';
import { jump, lock } from '../../redux-deep-diff';
import TopMenu from './TopMenu';
import { historyRedo, historyUndo } from '../../controller/actions/actionCreators';

const mapDispatchToProps = (dispatch) => ({
  jumpCmd: (index) => dispatch(jump(index)),
  lockCmd: () => dispatch(lock()),
  undoCmd: () => dispatch(historyUndo()),
  redoCmd: () => dispatch(historyRedo()),
});

const mapStateToProps = (state) => ({
  history: state.history,
  windowDimensions: state.layout.windowDimensions,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
