import { connect } from 'react-redux';
import { modelItemUpsert } from '../../../redux/action-creators';
import MetamodelToolbarWidget from './MetamodelToolbarWidget';

const mapStateToProps = (state) => ({
  sandbox: state.common.sandbox,
  objectClasses: state.metamodel?.classes || [],
});

const mapDispatchToProps = (dispatch) => ({
  upsertItem: (id, data) => dispatch(modelItemUpsert(id, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetamodelToolbarWidget);
