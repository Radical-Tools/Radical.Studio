import { connect } from 'react-redux';
import TimelineToolbarWidget from './PresentationTimelineToolbarWidget';
import {
  layoutModeChange,
  presentationSetGoTo,
  presentationStepAppend,
  presentationStepRemove,
} from '../../controller/actions/actionCreators';
import { LAYOUT_MODE } from '../../app/consts';

const mapStateToProps = (state) => ({
  presentation: state.presentationModel.current
    ? state.presentationModel.presentations[state.presentationModel.current]
    : undefined,
  presentationId: state.presentationModel.current
    ? state.presentationModel.current
    : undefined,
  editEnabled: state.layout.mode === LAYOUT_MODE.PRESENTATION,
  playEnabled: state.layout.mode === LAYOUT_MODE.PRESENTATION,
});

const mapDispatchToProps = (dispatch) => ({
  gotoStep: (presentationId, stepIndex) =>
    dispatch(presentationSetGoTo(presentationId, stepIndex)),
  appendStep: (presentationId) =>
    dispatch(presentationStepAppend(presentationId)),
  removeStep: (presentationId, stepIndex) =>
    dispatch(presentationStepRemove(presentationId, stepIndex)),
  onSetMode: (mode) => dispatch(layoutModeChange(mode)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineToolbarWidget);
