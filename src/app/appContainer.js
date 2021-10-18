import { connect } from 'react-redux';
import {
  setWindowDimensions,
  stateLoad,
  notificationAdd,
  undo,
  redo,
} from '../controller/actions/actionCreators';
import App from './App';

const mapDispatchToProps = (dispatch) => ({
  onWindowResize: (windowDimensions) =>
    dispatch(setWindowDimensions(windowDimensions)),
  onLoadStateFromUrl: (state) => dispatch(stateLoad(state)),
  onAddNotification: (message, type, name) =>
    dispatch(notificationAdd(message, type, name)),
  undoCmd: () => dispatch(undo()),
  redoCmd: () => dispatch(redo()),
});

const mapStateToProps = (state) => ({
  themeType: state.theme.current,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
