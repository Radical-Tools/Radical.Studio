import { connect } from 'react-redux';
import DiagramWidget from './DiagramWidget';
import renderView from '../../../model/helpers/viewmodel';
import { modelRelationAdd } from '../../../redux/action-creators';

const mapStateToProps = (state) => ({
  view: renderView(state.viewModel.views[state.viewModel.current], state.model),
});
const mapDispatchToProps = (dispatch) => ({
  // Here I assume viewmodel should set relation type etc or redux will handle showing a modal to user after checking if relation is valid as discussed
  onAddRelation: (source, target) =>
    dispatch(
      modelRelationAdd(
        undefined,
        'Interacts',
        'test name',
        undefined,
        source,
        target
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiagramWidget);
