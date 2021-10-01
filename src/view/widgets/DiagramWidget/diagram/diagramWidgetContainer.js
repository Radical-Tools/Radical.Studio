import { connect } from 'react-redux';
import renderView from '../../../../controller/handlers/common/viewmodel';
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
} from '../../../../controller/actions/actionCreators';
import { LAYOUT_MODE } from '../../../../app/consts';
import RadicalCanvasWidget from './DiagramWidget';

const generateTitle = (state) =>
  state.layout.mode === LAYOUT_MODE.EDIT
    ? `${state.viewModel.views[state.viewModel.current]?.name}`
    : `${state.project?.name} :: ${state.history.prev[0]?.name} :: ${
        state.viewModel.views[state.viewModel.current]?.name
      } `;

const mapStateToProps = (state) => ({
  viewmodel: renderView(
    state.viewModel.views[state.viewModel.current],
    state.model
  ),
  alignment: state.viewModel.views[state.viewModel.current].alignment,
  editEnabled:
    state.layout.mode === LAYOUT_MODE.EDIT && !state.project?.isLocked,
  selectionEnabled: state.layout === LAYOUT_MODE.EDIT,
  smoothTransitionMode: state.layout.mode !== LAYOUT_MODE.EDIT,
  alignEnabled: state.layout.mode === LAYOUT_MODE.EDIT,
  zoomToFitEnabled:
    state.layout.mode === LAYOUT_MODE.EDIT ||
    state.layout.mode === LAYOUT_MODE.PRESENTATION,
  exportEnabled: true,
  title: generateTitle(state),
});
const mapDispatchToProps = (dispatch) => ({
  onLinkConnected: (id, source, target, type) =>
    dispatch(modelRelationAdd(id, type, undefined, undefined, source, target)),
  onDragItemsEnd: (point, items) => {
    items.forEach((item) => {
      dispatch(
        viewModelNodeUpdate(
          undefined,
          item.getID(),
          { ...item.position },
          item.dimension
        )
      );
    });
  },
  onNodeRemove: (id) => dispatch(viewModelNodeRemove(id)),
  onLinkRemove: (id) => dispatch(viewModelLinkRemove(id)),
  onObjectRemove: (id) => dispatch(modelObjectRemove(id)),
  onRelationRemove: (id) => dispatch(modelRelationRemove(id)),
  onDiagramAlignmentUpdated: (offsetX, offsetY, zoom) =>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadicalCanvasWidget);
