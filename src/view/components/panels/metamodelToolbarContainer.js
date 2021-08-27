import { connect } from 'react-redux';
import groupBy from 'lodash/fp/groupBy';
import MetamodelToolbarWidget from './MetamodelToolbarWidget';

const mapStateToProps = (state) => ({
  objectClasses: state.metamodel
    ? groupBy('category', state.metamodel.classes)
    : undefined,
});
export default connect(mapStateToProps)(MetamodelToolbarWidget);
