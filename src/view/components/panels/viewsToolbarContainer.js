import { connect } from 'react-redux';
import {
  modelItemCreate,
  modelItemEdit,
  modelItemUpsert,
  viewModelViewActivate,
  viewModelViewRemove,
} from '../../../redux/action-creators';
import ViewsToolbarWidget from './ViewsToolbarWidget';

const mapStateToProps = (state) => {
  let currentViewId;

  if (state.layout.mode === 'presentation' && state.presentationModel.current) {
    currentViewId =
      state.presentationModel.presentations[state.presentationModel.current]
        .steps[
        state.presentationModel.presentations[state.presentationModel.current]
          .currentStepIndex
      ].properties.view;
  } else if (state.layout.mode === 'edit') {
    currentViewId = state.viewModel.current;
  }

  return {
    model: state.model,
    viewModel: state.viewModel,
    current: currentViewId,
    editMode: state.layout.mode === 'edit',
  };
};

const mapDispatchToProps = (dispatch) => ({
  onRemoveView: (id) => dispatch(viewModelViewRemove(id)),
  onEditView: (id) => dispatch(modelItemEdit(id, 'view')),
  onUpsertItem: (data) => dispatch(modelItemUpsert('View', data)),
  onCreateView: () => dispatch(modelItemCreate('view')),
  onViewActivate: (id) => dispatch(viewModelViewActivate(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewsToolbarWidget);
