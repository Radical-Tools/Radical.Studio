import { connect } from 'react-redux';
import {
  presentationSelect,
  presentationCreate,
  presentationUpdateName,
  presentationRemove,
} from '../../model/state/action-creators';
import PresentationsToolbarWidget from './presentationsToolbarWidget';

const mapStateToProps = (state) => ({
  presentationModel: state.presentationModel,
});

const mapDispatchToProps = (dispatch) => ({
  onRemovePresentation: (id) => dispatch(presentationRemove(id)),
  onUpdatePresentationName: (id, name) =>
    dispatch(presentationUpdateName(id, name)),
  onCreatePresentation: (name) => dispatch(presentationCreate(name)),
  onPresentationActivate: (id) => dispatch(presentationSelect(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentationsToolbarWidget);
