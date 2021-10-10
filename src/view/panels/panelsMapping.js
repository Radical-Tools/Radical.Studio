import modelToolbarContainer from './modelToolbarContainer';
import metamodelToolbarContainer from './metamodelToolbarContainer';
import diagramContainer from '../widgets/DiagramWidget/diagram/diagramWidgetContainer';
import viewsToolbarContainer from './viewsToolbarContainer';
import propertiesToolbarContainer from './propertiesToolbarContainer';
import presentationsToolbarContainer from './presentationsToolbarContainer';
import timelineToolbarContainer from './presentationTimelineToolbarContainer';

const panelsMapping = {
  model: modelToolbarContainer,
  views: viewsToolbarContainer,
  presentations: presentationsToolbarContainer,
  timeline: timelineToolbarContainer,
  canvas: diagramContainer,
  metamodel: metamodelToolbarContainer,
  properties: propertiesToolbarContainer,
};

export default panelsMapping;
