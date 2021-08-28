import modelToolbarContainer from '../panels/modelToolbarContainer';
import metamodelToolbarContainer from '../panels/metamodelToolbarContainer';
import diagramContainer from './DiagramWidget/diagram/diagramWidgetContainer';
import viewsToolbarContainer from '../panels/viewsToolbarContainer';
import propertiesToolbarContainer from '../panels/propertiesToolbarContainer';
import presentationsToolbarContainer from '../panels/presentationsToolbarContainer';
import timelineToolbarContainer from '../panels/timelineToolbarContainer';

const widgetsComponentMapping = {
  model: modelToolbarContainer,
  views: viewsToolbarContainer,
  presentations: presentationsToolbarContainer,
  timeline: timelineToolbarContainer,
  canvas: diagramContainer,
  metamodel: metamodelToolbarContainer,
  properties: propertiesToolbarContainer,
};

export default widgetsComponentMapping;
