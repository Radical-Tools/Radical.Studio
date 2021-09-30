import { connect } from 'react-redux';
import {
  modelItemCreate,
  modelItemEdit,
  modelItemUpsert,
  viewModelViewActivate,
  viewModelViewRemove,
} from '../../controller/actions/actionCreators';
import ViewsToolbarWidget from './ViewsToolbarWidget';
import { LAYOUT_MODE } from '../../app/consts';

const mapStateToProps = (state) => ({
  model: state.model,
  viewModel: state.viewModel,
  current: state.viewModel.current,
  editMode: state.layout.mode === LAYOUT_MODE.EDIT,
});

const mapDispatchToProps = (dispatch) => ({
  onRemoveView: (id) => dispatch(viewModelViewRemove(id)),
  onEditView: (id) => dispatch(modelItemEdit(id, 'view')),
  onUpsertItem: (data) => dispatch(modelItemUpsert('View', data)),
  onCreateView: () => dispatch(modelItemCreate('view')),
  onViewActivate: (id) => dispatch(viewModelViewActivate(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewsToolbarWidget);
