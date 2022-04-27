import { connect } from 'react-redux';
import {
  presentationSelect,
  presentationCreate,
  presentationUpdateName,
  presentationRemove,
  layoutModeChange,
} from '../../controller/actions/actionCreators';
import PresentationsToolbarWidget from './PresentationsToolbarWidget';

const mapStateToProps = (state) => ({
  presentationModel: state.project.presentationModel,
});

const mapDispatchToProps = (dispatch) => ({
  onRemovePresentation: (id) => dispatch(presentationRemove(id)),
  onUpdatePresentationName: (id, name) =>
    dispatch(presentationUpdateName(id, name)),
  onCreatePresentation: (name) => dispatch(presentationCreate(name)),
  onPresentationActivate: (id) => dispatch(presentationSelect(id)),
  onSetMode: (mode) => dispatch(layoutModeChange(mode)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentationsToolbarWidget);
