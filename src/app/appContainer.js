import { connect } from 'react-redux';
import { setWindowDimensions } from '../controller/actions/action-creators';
import App from './App';

const mapDispatchToProps = (dispatch) => ({
  onWindowResize: (windowDimensions) =>
    dispatch(setWindowDimensions(windowDimensions)),
});

const mapStateToProps = (state) => ({
  themeType: state.theme.current,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
