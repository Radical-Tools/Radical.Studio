import React, { useCallback, useEffect, useState } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { NodeModel } from '@projectstorm/react-diagrams';
import { useDrop } from 'react-dnd';
import Box from '@material-ui/core/Box';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import createRadicalEngine from './core/createRadicalEngine';

import {
  DRAG_DIAGRAM_ITEMS_END_EVENT,
  LINK_CONNECTED_TO_TARGET_EVENT,
  DIAGRAM_ENTITY_SELECTED,
  DIAGRAM_NODE_COLLAPSED,
  DIAGRAM_NODE_EXPANDED,
  DIAGRAM_ENTITY_DELETED,
  MODEL_DROP_TYPE,
  METAMODEL_DROP_TYPE,
  DIAGRAM_LINK_TARGET_SELECTED_EVENT,
  DIAGRAM_ITEM_NAME_CHANGED,
  DIAGRAM_NODE_DETACHED,
  DRAG_CANVAS_END_EVENT,
  CANVAS_ZOOM_CHANGED,
} from './consts';
import { addLinks, addNodes } from './core/viewModelRenderer';
import RadicalDiagramModel from './core/RadicalDiagramModel';
import ToolbarMenu from '../../../components/ToolbarMenu';
import { getCanvas } from '../../../../tests/getDataTestId';

const zoomDebounceTime = 500;
const mapViewmodel = (viewmodel, editMode) => {
  const diagramModel = new RadicalDiagramModel();
  addNodes(diagramModel, viewmodel, editMode);
  addLinks(diagramModel, viewmodel, editMode);
  return diagramModel;
};

const fillStyle = {
  width: '100%',
  height: '100%',
};
const fillCanvasStyle = {
  width: '100%',
  height: '94%',
  '& .fill': fillStyle,
};
const DiagramWidget = ({
  viewmodel,
  alignment,
  editMode,
  animMode,
  onDragItemsEnd,
  onLinkConnected,
  onDiagramAlignmentUpdated,
  onNodeRemove,
  onLinkRemove,
  onLayoutAlign,
  onAddObjectToView,
  onObjectRemove,
  onRelationRemove,
  onItemSelected,
  onNodeCollapsed,
  onNodeExpanded,
  onAddMetamodelObjectToView,
  onItemNameUpdated,
  onNodeDetached,
}) => {
  const debouncedZoom = debounce(onDiagramAlignmentUpdated, zoomDebounceTime);
  const registerCallbacks = useCallback(
    () => ({
      eventDidFire: (e) => {
        switch (e.function) {
          case DRAG_DIAGRAM_ITEMS_END_EVENT:
            onDragItemsEnd({ ...e.point }, e.items);
            break;
          case LINK_CONNECTED_TO_TARGET_EVENT:
            onLinkConnected(e.sourceId, e.targetId);
            break;
          case DRAG_CANVAS_END_EVENT:
            onDiagramAlignmentUpdated(e.offsetX, e.offsetY, e.zoom);
            break;
          case CANVAS_ZOOM_CHANGED:
            debouncedZoom(e.offsetX, e.offsetY, e.zoom);
            break;
          case DIAGRAM_ENTITY_SELECTED:
            onItemSelected(
              e.entity.getID(),
              e.entity instanceof NodeModel ? 'object' : 'relation',
              e.isSelected
            );
            break;
          case DIAGRAM_NODE_COLLAPSED:
            onNodeCollapsed(e.id);
            break;
          case DIAGRAM_NODE_EXPANDED:
            onNodeExpanded(e.id);
            break;
          case DIAGRAM_ENTITY_DELETED:
            if (e.entity instanceof NodeModel) {
              if (e.deleteFromModel) {
                onObjectRemove(e.entity.getID());
              } else {
                onNodeRemove(e.entity.getID());
              }
            } else if (e.deleteFromModel) {
              onRelationRemove(e.entity.getID());
            } else {
              onLinkRemove(e.entity.getID());
            }
            break;
          case DIAGRAM_LINK_TARGET_SELECTED_EVENT:
            onLinkConnected(e.id, e.source, e.target, e.type);
            break;
          case DIAGRAM_ITEM_NAME_CHANGED:
            onItemNameUpdated(
              e.entity.getID(),
              e.entity instanceof NodeModel ? 'object' : 'relation',
              e.entity.options.name
            );
            break;
          case DIAGRAM_NODE_DETACHED:
            onNodeDetached(e.id);
            break;
          default:
            break;
        }
      },
    }),
    [
      onDragItemsEnd,
      onLinkConnected,
      onDiagramAlignmentUpdated,
      onItemSelected,
      onNodeExpanded,
      onNodeCollapsed,
      onNodeRemove,
      onLinkRemove,
      onObjectRemove,
      onRelationRemove,
      onItemNameUpdated,
      onNodeDetached,
      debouncedZoom,
    ]
  );

  const [engine] = useState(createRadicalEngine(editMode));
  const [isModelSet, setIsModelSet] = useState(false);
  const [viewName, setViewName] = useState();
  useEffect(() => {
    const isViewChanged = viewName !== viewmodel.name;
    setViewName(viewmodel.name);
    const model = mapViewmodel(viewmodel, editMode);

    model.registerListener(registerCallbacks());
    model.getNodes().forEach((node) => {
      node.registerListener(registerCallbacks());
    });
    model.getLinks().forEach((link) => {
      link.registerListener(registerCallbacks());
      link.update();
    });
    if (animMode && !isViewChanged) {
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
    editMode,
    animMode,
    alignment,
    engine,
    registerCallbacks,
    viewName,
  ]);

  const [, drop] = useDrop(() => ({
    accept: [MODEL_DROP_TYPE, METAMODEL_DROP_TYPE],
    drop: (item, monitor) => {
      const dropPoint = engine.getRelativeMousePoint({
        clientX: monitor.getClientOffset().x,
        clientY: monitor.getClientOffset().y,
      });

      const node = engine.getNodeAtPosition(
        monitor.getClientOffset().x,
        monitor.getClientOffset().y
      );
      if (item.type === MODEL_DROP_TYPE) {
        onAddObjectToView(item.id, { ...dropPoint });
      } else {
        onAddMetamodelObjectToView(
          item.metamodelType,
          { ...dropPoint },
          node ? node.getID() : undefined
        );
      }
    },
  }));
  return (
    <>
      {engine && isModelSet && (
        <Box sx={fillStyle}>
          <ToolbarMenu
            onLayoutAlign={editMode ? onLayoutAlign : undefined}
            onZoomToFit={() => {
              engine.zoomToFitNodes({ margin: 50 });
              engine.getModel().fireEvent(
                {
                  offsetX: engine.getModel().options.offsetX,
                  offsetY: engine.getModel().options.offsetY,
                  zoom: engine.getModel().options.zoom,
                },
                CANVAS_ZOOM_CHANGED
              );
            }}
            name={viewName}
          />
          <Box data-testid={getCanvas()} ref={drop} sx={fillCanvasStyle}>
            <CanvasWidget className="fill canvas-view" engine={engine} />
          </Box>
        </Box>
      )}
    </>
  );
};
DiagramWidget.propTypes = {
  viewmodel: PropTypes.objectOf(PropTypes.any).isRequired,
  alignment: PropTypes.objectOf(PropTypes.any).isRequired,
  editMode: PropTypes.bool.isRequired,
  animMode: PropTypes.bool.isRequired,
  onDragItemsEnd: PropTypes.func.isRequired,
  onLinkConnected: PropTypes.func.isRequired,
  onDiagramAlignmentUpdated: PropTypes.func.isRequired,
  onNodeRemove: PropTypes.func.isRequired,
  onLinkRemove: PropTypes.func.isRequired,
  onObjectRemove: PropTypes.func.isRequired,
  onRelationRemove: PropTypes.func.isRequired,
  onLayoutAlign: PropTypes.func.isRequired,
  onAddObjectToView: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  onNodeCollapsed: PropTypes.func.isRequired,
  onNodeExpanded: PropTypes.func.isRequired,
  onAddMetamodelObjectToView: PropTypes.func.isRequired,
  onItemNameUpdated: PropTypes.func.isRequired,
  onNodeDetached: PropTypes.func.isRequired,
};

export default React.memo(DiagramWidget);