import modelToolbarContainer from '../panels/modelToolbarContainer';
import metamodelToolbarContainer from '../panels/metamodelToolbarContainer';
import diagramContainer from './diagramContainer';

const widgetsComponentMapping = {
  model: modelToolbarContainer,
  canvas: diagramContainer,
  metamodel: metamodelToolbarContainer,
};

export default widgetsComponentMapping;
