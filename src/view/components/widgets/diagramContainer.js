import { connect } from 'react-redux';
import DiagramWidget from './DiagramWidget';
import renderView from '../../../model/helpers/viewmodel';
import {
  modelItemEdit,
  modelObjectRemove,
  modelRelationAdd,
  modelRelationRemove,
  viewModelLayoutAlign,
  viewModelLinkRemove,
  viewModelNodeRemove,
  viewModelNodeUpdate,
  viewModelViewAlignmentUpdate
} from '../../../redux/action-creators';

const mapStateToProps = (state) => ({
  view: renderView(state.viewModel.views[state.viewModel.current], state.model),
  alignment: state.viewModel.views[state.viewModel.current].alignment,
});
const mapDispatchToProps = (dispatch) => ({
  onAddRelation: (source, target) =>
    dispatch(
      modelRelationAdd(
        undefined,
        undefined,
        undefined,
        undefined,
        source,
        target
      )
    ),
  onNodeUpdate: (id, position, dimension) =>
    dispatch(viewModelNodeUpdate(undefined, id, position, dimension)),
  onNodeRemoved: (id) => dispatch(viewModelNodeRemove(id)),
  onLinkRemoved: (id) => dispatch(viewModelLinkRemove(id)),
  onObjectRemoved: (id) => dispatch(modelObjectRemove(id)),
  onRelationRemoved: (id) => dispatch(modelRelationRemove(id)),
  onCanvasAlignmentUpdated: (offsetX, offsetY, zoom) =>
    dispatch(viewModelViewAlignmentUpdate(offsetX, offsetY, zoom)),
  onLayoutAlign: () => dispatch(viewModelLayoutAlign()),
  onItemSelected: (id, type) => dispatch(modelItemEdit(id, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiagramWidget);
