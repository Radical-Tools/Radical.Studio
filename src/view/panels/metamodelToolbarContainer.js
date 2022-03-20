import { connect } from 'react-redux';
import groupBy from 'lodash/fp/groupBy';
import MetamodelToolbarWidget from './MetamodelToolbarWidget';

const mapStateToProps = (state) => ({
  objectClasses: state.metamodel.C4
    ? groupBy('category', state.metamodel.C4.classes)
    : undefined,
  smallHeight: state.layout.windowDimensions?.height < 1000,
});
export default connect(mapStateToProps)(MetamodelToolbarWidget);
