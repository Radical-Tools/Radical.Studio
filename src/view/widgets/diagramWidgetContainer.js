import { connect } from 'react-redux';
import DiagramWidget from './DiagramWidget';
import renderView from '../../controller/handlers/common/viewmodel';
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
} from '../../controller/actions/action-creators';
import { LAYOUT_MODE } from '../../common/consts';

const mapStateToProps = (state) => {
  const view =
    state.layout.mode === LAYOUT_MODE.PRESENTATION &&
    state.presentationModel.current &&
    state.presentationModel.presentations[state.presentationModel.current]
      ? state.presentationModel.presentations[state.presentationModel.current]
          .steps[
          state.presentationModel.presentations[state.presentationModel.current]
            .currentStepIndex
        ]
      : undefined;

  if (view) {
    return {
      view: renderView(
        state.viewModel.views[view.properties.view],
        state.model
      ),
      alignment: view.properties.alignment,
      editMode: state.layout.mode === LAYOUT_MODE.EDIT,
    };
  }

  return {
    view: renderView(
      state.viewModel.views[state.viewModel.current],
      state.model
    ),
    alignment: state.viewModel.views[state.viewModel.current].alignment,
    editMode: state.layout.mode === LAYOUT_MODE.EDIT,
  };
};
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
