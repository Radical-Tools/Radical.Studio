import modelToolbarContainer from '../panels/modelToolbarContainer';
import metamodelToolbarContainer from '../panels/metamodelToolbarContainer';
import diagramContainer from './diagramContainer';
import viewsToolbarContainer from '../panels/viewsToolbarContainer';
import propertiesToolbarContainer from '../panels/propertiesToolbarContainer';

const widgetsComponentMapping = {
  model: modelToolbarContainer,
  views: viewsToolbarContainer,
  canvas: diagramContainer,
  metamodel: metamodelToolbarContainer,
  properties: propertiesToolbarContainer,
};

export default widgetsComponentMapping;
