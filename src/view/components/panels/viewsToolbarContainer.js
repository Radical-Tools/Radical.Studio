import { connect } from 'react-redux';
import {
  modelItemCreate,
  modelItemEdit,
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
  onCreateView: () => dispatch(modelItemCreate('view')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewsToolbarWidget);
