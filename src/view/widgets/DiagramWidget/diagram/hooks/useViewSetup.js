import { useEffect, useState } from 'react';
import createRadicalEngine, {
  updateRadicalEngine,
} from '../core/createRadicalEngine';
import RadicalDiagramModel from '../core/RadicalDiagramModel';
import { addLinks, addNodes } from '../core/viewModelRenderer';

const mapViewmodel = (viewmodel, editMode) => {
  const diagramModel = new RadicalDiagramModel();
  addNodes(diagramModel, viewmodel, editMode);
  addLinks(diagramModel, viewmodel, editMode);
  return diagramModel;
};

const useViewSetup = (
  registerCallbacks,
  viewmodel,
  editEnabled,
  selectionEnabled,
  smoothTransitionMode,
  alignment
) => {
  const [isModelSet, setIsModelSet] = useState(false);
  const [engine] = useState(createRadicalEngine());
  const [viewName, setViewName] = useState();
  useEffect(() => {
    updateRadicalEngine(engine, editEnabled, selectionEnabled);
    const isViewChanged = viewName !== viewmodel.name;
    setViewName(viewmodel.name);
    const model = mapViewmodel(viewmodel, editEnabled);

    model.registerListener(registerCallbacks());
    model.getNodes().forEach((node) => {
      node.registerListener(registerCallbacks());
    });
    model.getLinks().forEach((link) => {
      link.registerListener(registerCallbacks());
      link.update();
    });
    if (smoothTransitionMode && !isViewChanged) {
      const sourceZoomLevel = engine.getModel().getZoomLevel();
      const sourceOffsetX = engine.getModel().getOffsetX();
      const sourceOffsetY = engine.getModel().getOffsetY();
      engine.setModel(model);
      engine.moveWithAnim(
        sourceZoomLevel,
        sourceOffsetX,
        sourceOffsetY,
        alignment.zoom,
        alignment.offsetX,
        alignment.offsetY
      );
    } else {
      engine.setModel(model);
      model.setInitialZoomLevel(alignment.zoom);
      model.setInitialOffset(alignment.offsetX, alignment.offsetY);
    }
    setIsModelSet(true);
  }, [
    viewmodel,
    editEnabled,
    smoothTransitionMode,
    alignment,
    engine,
    registerCallbacks,
    viewName,
    selectionEnabled,
  ]);
  return [engine, isModelSet];
};

export default useViewSetup;
