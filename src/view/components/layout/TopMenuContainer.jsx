import { connect } from 'react-redux';
import { undo, redo } from 'redux-deep-diff';
import TopMenu from './TopMenu';

const mapDispatchToProps = (dispatch) => ({
  undoCmd: () => dispatch(undo()),
  redoCmd: () => dispatch(redo()),
});

const mapStateToProps = (state) => ({
  isPrev: state.diff.prev.length > 0,
  isNext: state.diff.next.length > 0,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
