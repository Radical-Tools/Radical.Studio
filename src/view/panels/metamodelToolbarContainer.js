import { connect } from 'react-redux';
import groupBy from 'lodash/fp/groupBy';
import MetamodelToolbarWidget from './MetamodelToolbarWidget';
import {
  currentMetamodelIdSelector,
  currentMetamodelSelector,
} from '../../controller/selectors';

const mapStateToProps = (state) => ({
  objectClasses: currentMetamodelSelector(state)
    ? groupBy('category', currentMetamodelSelector(state).classes)
    : undefined,
  metamodel: currentMetamodelIdSelector(state),
  smallHeight: state.layout.windowDimensions?.height < 1000,
});

export default connect(mapStateToProps)(MetamodelToolbarWidget);
