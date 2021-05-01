import { connect } from 'react-redux';
import DiagramWidget from './DiagramWidget';
import renderView from '../../../model/helpers/viewmodel';
import {
  modelRelationAdd,
  viewModelNodeRemove,
  viewModelNodeUpdate,
  viewModelViewAlignmentUpdate,
} from '../../../redux/action-creators';

const mapStateToProps = (state) => ({
  view: renderView(state.viewModel.views[state.viewModel.current], state.model),
  alignment: state.viewModel.views[state.viewModel.current].alignment,
});
const mapDispatchToProps = (dispatch) => ({
  // Here I assume viewmodel should set relation type etc or redux will handle showing a modal to user after checking if relation is valid as discussed
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
  onCanvasAlignmentUpdated: (offsetX, offsetY, zoom) =>
    dispatch(viewModelViewAlignmentUpdate(offsetX, offsetY, zoom)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiagramWidget);
