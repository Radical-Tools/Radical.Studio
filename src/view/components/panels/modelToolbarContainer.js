import { connect } from 'react-redux';
import {
  modelItemCreate,
  modelItemEdit,
  modelObjectRemove,
  modelRelationRemove,
} from '../../../redux/action-creators';
import ModelToolbarWidget from './ModelToolbarWidget';

const mapStateToProps = (state) => ({ model: state.model });

const mapDispatchToProps = (dispatch) => ({
  onRemoveObject: (id) => dispatch(modelObjectRemove(id)),
  onEditObject: (id) => dispatch(modelItemEdit(id, 'object')),
  onCreateObject: () => dispatch(modelItemCreate('object')),
  onRemoveRelation: (id) => dispatch(modelRelationRemove(id)),
  onEditRelation: (id) => dispatch(modelItemEdit(id, 'relation')),
  onCreateRelation: () => dispatch(modelItemCreate('relation')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelToolbarWidget);
