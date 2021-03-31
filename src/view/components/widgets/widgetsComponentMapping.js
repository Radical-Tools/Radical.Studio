import DiagramWidget from './DiagramWidget';
import modelToolbarContainer from '../panels/modelToolbarContainer';
import metamodelToolbarContainer from '../panels/metamodelToolbarContainer';

const widgetsComponentMapping = {
  model: modelToolbarContainer,
  canvas: DiagramWidget,
  metamodel: metamodelToolbarContainer,
};

export default widgetsComponentMapping;
