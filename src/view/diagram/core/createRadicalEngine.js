import {
  PathFindingLinkFactory,
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
import { DEFAULT_TARGET_PORT, ENGINE_REPAINT_DEBOUNCE } from '../consts';
import RadicalDeleteItemsAction from '../actions/RadicalDeleteItemsAction';
import RadicalZoomCanvasAction from '../actions/RadicalZoomCanvasAction';
import RadicalLinkLayerFactory from '../links/RadicalLinkLayerFactory';

const createRadicalEngine = (editMode = true) => {
  const engine = new RadicalDiagramEngine({
    registerDefaultDeleteItemsAction: false,
    registerDefaultZoomCanvasAction: false,
    repaintDebounceMs: ENGINE_REPAINT_DEBOUNCE,
  });

  if (editMode) {
    engine.getStateMachine().pushState(new RadicalState());
  }

  engine.getLayerFactories().registerFactory(new NodeLayerFactory());
  engine.getLayerFactories().registerFactory(new RadicalLinkLayerFactory());
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

  if (editMode) {
    engine
      .getActionEventBus()
      .registerAction(new RadicalDeleteItemsAction({ keyCodes: [46] }));
  }
  engine.getActionEventBus().registerAction(new RadicalZoomCanvasAction());
  return engine;
};
export default createRadicalEngine;
