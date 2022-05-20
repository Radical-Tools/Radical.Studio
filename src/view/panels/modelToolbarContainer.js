import { connect } from 'react-redux';
import {
  modelItemUpsert,
  modelObjectRemove,
  modelRelationRemove,
  viewModelItemSelectionChanged,
  viewModelNodeAdd,
} from '../../controller/actions/actionCreators';
import {
  currentMetamodelObjectAttributesSelector,
  currentMetamodelRelationAttributesSelector,
} from '../../controller/selectors';
import ModelToolbarWidget from './ModelToolbarWidget';

const mapStateToProps = (state) => ({
  relationAttributes: currentMetamodelRelationAttributesSelector(state),
  objectAttributes: currentMetamodelObjectAttributesSelector(state),
  model: state.project.model,
  viewModel: state.project.viewModel,
});

const mapDispatchToProps = (dispatch) => ({
  onRemoveObject: (id) => dispatch(modelObjectRemove(id)),
  onRemoveRelation: (id) => dispatch(modelRelationRemove(id)),
  onAddObjectToView: (id) => dispatch(viewModelNodeAdd(undefined, id)),
  onUpsertItem: (id, data) => dispatch(modelItemUpsert(id, data)),
  onItemSelected: (id, type, isSelected) =>
    dispatch(viewModelItemSelectionChanged(id, type, isSelected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelToolbarWidget);
