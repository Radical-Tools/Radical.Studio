import { connect } from 'react-redux';
import { modelItemUpsert } from '../../controller/actions/action-creators';
import PropertiesToolbarWidget from './PropertiesToolbarWidget';

const mapStateToProps = (state) => ({
  sandbox: state.common.sandbox,
});

const mapDispatchToProps = (dispatch) => ({
  upsertItem: (id, data) => dispatch(modelItemUpsert(id, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertiesToolbarWidget);
