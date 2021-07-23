import { connect } from 'react-redux';
import MetamodelToolbarWidget from './MetamodelToolbarWidget';

const mapStateToProps = (state) => ({
  objectClasses: state.metamodel?.classes || [],
});

export default connect(mapStateToProps)(MetamodelToolbarWidget);
