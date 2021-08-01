import { connect } from 'react-redux';
import {
  modelItemCreate,
  modelItemEdit,
  modelItemUpsert,
  viewModelViewActivate,
  viewModelViewRemove,
} from '../../../redux/action-creators';
import ViewsToolbarWidget from './ViewsToolbarWidget';

const mapStateToProps = (state) => ({
  model: state.model,
  viewModel: state.viewModel,
});

const mapDispatchToProps = (dispatch) => ({
  onRemoveView: (id) => dispatch(viewModelViewRemove(id)),
  onEditView: (id) => dispatch(modelItemEdit(id, 'view')),
  onUpsertItem: (data) => dispatch(modelItemUpsert('View', data)),
  onCreateView: () => dispatch(modelItemCreate('view')),
  onViewActivate: (id) => dispatch(viewModelViewActivate(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewsToolbarWidget);
