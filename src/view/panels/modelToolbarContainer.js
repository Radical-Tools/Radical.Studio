import { connect } from 'react-redux';
import {
  modelItemUpsert,
  modelObjectRemove,
  modelRelationRemove,
  viewModelItemSelectionChanged,
  viewModelNodeAdd,
} from '../../model/state/action-creators';
import ModelToolbarWidget from './ModelToolbarWidget';

const mapStateToProps = (state) => ({
  model: state.model,
  viewModel: state.viewModel,
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
