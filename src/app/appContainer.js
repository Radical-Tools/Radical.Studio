import { connect } from 'react-redux';
import { setWindowDimensions } from '../model/state/action-creators';
import App from './App';

const mapDispatchToProps = (dispatch) => ({
  onWindowResize: (windowDimensions) =>
    dispatch(setWindowDimensions(windowDimensions)),
});

const mapStateToProps = (state) => ({
  themeType: state.theme.current,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
