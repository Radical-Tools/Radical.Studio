import {
  PathFindingLinkFactory,
  LinkLayerFactory,
  NodeLayerFactory,
  DefaultLabelFactory,
  DefaultLinkFactory,
  DefaultNodeFactory,
  DefaultPortFactory,
} from '@projectstorm/react-diagrams';
import { SelectionBoxLayerFactory } from '@projectstorm/react-canvas-core';

import RadicalDiagramEngine from './RadicalDiagramEngine';
import RadicalState from '../states/RadicalState';
import RadicalPortModel from '../ports/RadicalPortModel';
import RadicalPortFactory from '../ports/RadicalPortFactory';
import RadicalComposedNodeFactory from '../nodes/RadicalComposedNodeFactory';
import RadicalLinkFactory from '../links/RadicalLinkFactory';

const createRadicalEngine = () => {
  const engine = new RadicalDiagramEngine({
    registerDefaultDeleteItemsAction: false,
    repaintDebounceMs: 10,
  });
  engine.getStateMachine().pushState(new RadicalState());
  // const engine = createEngine();
  engine.getLayerFactories().registerFactory(new NodeLayerFactory());
  engine.getLayerFactories().registerFactory(new LinkLayerFactory());
  engine.getLayerFactories().registerFactory(new SelectionBoxLayerFactory());

  engine.getLabelFactories().registerFactory(new DefaultLabelFactory());
  engine.getNodeFactories().registerFactory(new DefaultNodeFactory());
  engine.getLinkFactories().registerFactory(new DefaultLinkFactory());
  engine.getLinkFactories().registerFactory(new PathFindingLinkFactory());
  engine.getPortFactories().registerFactory(new DefaultPortFactory());

  engine.getNodeFactories().registerFactory(new RadicalComposedNodeFactory());
  engine.getLinkFactories().registerFactory(new RadicalLinkFactory());
  engine
    .getPortFactories()
    .registerFactory(
      new RadicalPortFactory('diamond', () => new RadicalPortModel('left'))
    );
  return engine;
};
export default createRadicalEngine;
