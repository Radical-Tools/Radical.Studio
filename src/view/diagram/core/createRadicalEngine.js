import {
  PathFindingLinkFactory,
  LinkLayerFactory,
  NodeLayerFactory,
  DefaultLabelFactory,
} from '@projectstorm/react-diagrams';
import { SelectionBoxLayerFactory } from '@projectstorm/react-canvas-core';

import RadicalDiagramEngine from './RadicalDiagramEngine';
import RadicalState from '../states/RadicalState';
import RadicalPortModel from '../ports/RadicalPortModel';
import RadicalPortFactory from '../ports/RadicalPortFactory';
import RadicalComposedNodeFactory from '../nodes/RadicalComposedNodeFactory';
import RadicalLinkFactory from '../links/RadicalLinkFactory';
import RadicalLabelFactory from '../labels/RadicalLabelFactory';
import { DEFAULT_TARGET_PORT } from '../consts';
import RadicalDeleteItemsAction from '../actions/RadicalDeleteItemsAction';

const createRadicalEngine = () => {
  const engine = new RadicalDiagramEngine({
    registerDefaultDeleteItemsAction: false,
    repaintDebounceMs: 10,
  });
  engine.getStateMachine().pushState(new RadicalState());

  engine.getLayerFactories().registerFactory(new NodeLayerFactory());
  engine.getLayerFactories().registerFactory(new LinkLayerFactory());
  engine.getLayerFactories().registerFactory(new SelectionBoxLayerFactory());

  engine.getLabelFactories().registerFactory(new DefaultLabelFactory());
  engine.getNodeFactories().registerFactory(new RadicalComposedNodeFactory());

  engine.getLinkFactories().registerFactory(new PathFindingLinkFactory());
  engine.getLinkFactories().registerFactory(new RadicalLinkFactory());

  engine
    .getPortFactories()
    .registerFactory(
      new RadicalPortFactory(
        'diamond',
        () => new RadicalPortModel(DEFAULT_TARGET_PORT)
      )
    );
  engine.getLabelFactories().registerFactory(new RadicalLabelFactory());

  engine
    .getActionEventBus()
    .registerAction(new RadicalDeleteItemsAction({ keyCodes: [46] }));
  return engine;
};
export default createRadicalEngine;
