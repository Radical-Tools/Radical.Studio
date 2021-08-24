import { connect } from 'react-redux';
import TimelineToolbarWidget from './TimelineToolbarWidget';
import {
  presentationSetGoTo,
  presentationStepAppend,
  presentationStepRemove,
} from '../../../redux/action-creators';

const mapStateToProps = (state) => ({
  presentation: state.presentationModel.current
    ? state.presentationModel.presentations[state.presentationModel.current]
    : undefined,
  presentationId: state.presentationModel.current
    ? state.presentationModel.current
    : undefined,
});

const mapDispatchToProps = (dispatch) => ({
  gotoStep: (presentationId, stepIndex) =>
    dispatch(presentationSetGoTo(presentationId, stepIndex)),
  appendStep: (presentationId) =>
    dispatch(presentationStepAppend(presentationId)),
  removeStep: (presentationId, stepIndex) =>
    dispatch(presentationStepRemove(presentationId, stepIndex)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineToolbarWidget);
