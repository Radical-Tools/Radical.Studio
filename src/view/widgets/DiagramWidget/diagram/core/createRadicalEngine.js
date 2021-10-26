import {
  PathFindingLinkFactory,
  NodeLayerFactory,
  DefaultLabelFactory,
} from '@projectstorm/react-diagrams';
import { SelectionBoxLayerFactory } from '@projectstorm/react-canvas-core';

import RadicalDiagramEngine from './RadicalDiagramEngine';
import RadicalPortModel from '../ports/RadicalPortModel';
import RadicalPortFactory from '../ports/RadicalPortFactory';
import RadicalComposedNodeFactory from '../nodes/RadicalComposedNodeFactory';
import RadicalLinkFactory from '../links/RadicalLinkFactory';
import RadicalLabelFactory from '../labels/RadicalLabelFactory';
import { DEFAULT_TARGET_PORT, ENGINE_REPAINT_DEBOUNCE } from '../consts';
import RadicalZoomCanvasAction from '../actions/RadicalZoomCanvasAction';
import RadicalLinkLayerFactory from '../links/RadicalLinkLayerFactory';
import RadicalState from '../states/RadicalState';
import RadicalDeleteItemsAction from '../actions/RadicalDeleteItemsAction';

const createRadicalEngine = () => {
  const engine = new RadicalDiagramEngine({
    registerDefaultDeleteItemsAction: false,
    registerDefaultZoomCanvasAction: false,
    repaintDebounceMs: ENGINE_REPAINT_DEBOUNCE,
  });

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

  engine.getActionEventBus().registerAction(new RadicalZoomCanvasAction());
  engine.getStateMachine().pushState(new RadicalState());

  engine
    .getActionEventBus()
    .registerAction(new RadicalDeleteItemsAction({ keyCodes: [46] }));
  return engine;
};

export const updateRadicalEngine = (engine, editEnabled, selectionEnabled) => {
  engine.setSelectionEnabled(selectionEnabled);
  engine.setEditEnabled(editEnabled);
};

export default createRadicalEngine;
