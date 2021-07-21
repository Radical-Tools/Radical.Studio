import { connect } from 'react-redux';
import DiagramWidget from './DiagramWidget';
import renderView from '../../../model/helpers/viewmodel';
import {
  modelObjectRemove,
  modelItemUpdateName,
  modelRelationAdd,
  modelRelationRemove,
  viewModelItemSelectionChanged,
  viewModelLayoutAlign,
  viewModelLinkRemove,
  viewModelMetamodelObjectAdd,
  viewModelNodeAdd,
  viewModelNodeCollapse,
  viewModelNodeExpand,
  viewModelNodeRemove,
  viewModelNodeUpdate,
  viewModelViewAlignmentUpdate,
  modelObjectDetach,
} from '../../../redux/action-creators';

const mapStateToProps = (state) => ({
  view: renderView(state.viewModel.views[state.viewModel.current], state.model),
  alignment: state.viewModel.views[state.viewModel.current].alignment,
});
const mapDispatchToProps = (dispatch) => ({
  onAddRelation: (id, source, target, type) =>
    dispatch(modelRelationAdd(id, type, undefined, undefined, source, target)),
  onNodeUpdate: (id, position, dimension) =>
    dispatch(viewModelNodeUpdate(undefined, id, position, dimension)),
  onNodeRemoved: (id) => dispatch(viewModelNodeRemove(id)),
  onLinkRemoved: (id) => dispatch(viewModelLinkRemove(id)),
  onObjectRemoved: (id) => dispatch(modelObjectRemove(id)),
  onRelationRemoved: (id) => dispatch(modelRelationRemove(id)),
  onCanvasAlignmentUpdated: (offsetX, offsetY, zoom) =>
    dispatch(viewModelViewAlignmentUpdate(offsetX, offsetY, zoom)),
  onLayoutAlign: () => dispatch(viewModelLayoutAlign()),
  onAddObjectToView: (id, position) =>
    dispatch(viewModelNodeAdd(undefined, id, position)),
  onItemSelected: (id, type, isSelected) =>
    dispatch(viewModelItemSelectionChanged(id, type, isSelected)),
  onNodeCollapsed: (id) => dispatch(viewModelNodeCollapse(id)),
  onNodeExpanded: (id) => dispatch(viewModelNodeExpand(id)),
  onItemNameUpdated: (id, type, name) =>
    dispatch(modelItemUpdateName(id, type, name)),
  onAddMetamodelObjectToView: (type, position, node) =>
    dispatch(viewModelMetamodelObjectAdd(undefined, type, position, node)),
  onNodeDetached: (id) => dispatch(modelObjectDetach(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiagramWidget);
