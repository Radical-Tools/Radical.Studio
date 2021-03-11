import DiagramWidget from './DiagramWidget';
import MetamodelToolbarWidget from './MetamodelToolbarWidget';
import ModelToolbarWidget from './ModelToolbarWidget';

const widgetsComponentMapping = {
  model: ModelToolbarWidget,
  canvas: DiagramWidget,
  metamodel: MetamodelToolbarWidget,
};

export default widgetsComponentMapping;
