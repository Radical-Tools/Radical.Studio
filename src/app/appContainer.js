import { connect } from 'react-redux';
import { setWindowDimensions } from '../controller/actions/actionCreators';
import App from './App';

const mapDispatchToProps = (dispatch) => ({
  onWindowResize: (windowDimensions) =>
    dispatch(setWindowDimensions(windowDimensions)),
});

const mapStateToProps = (state) => {
  // eslint-disable-next-line no-console
  console.log(state);
  return {
    themeType: state.theme.current,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
