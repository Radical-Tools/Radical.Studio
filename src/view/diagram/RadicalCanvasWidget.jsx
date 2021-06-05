import React, { useCallback, useEffect, useState } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { NodeModel } from '@projectstorm/react-diagrams';
import { useDrop } from 'react-dnd';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import createRadicalEngine from './core/createRadicalEngine';
import {
  DIAGRAM_ALIGNMENT_UPDATED_EVENT,
  DRAG_DIAGRAM_ITEMS_END_EVENT,
  LINK_CONNECTED_TO_TARGET_EVENT,
  DIAGRAM_ENTITY_SELECTED,
  DIAGRAM_NODE_COLLAPSED,
  DIAGRAM_NODE_EXPANDED,
  DIAGRAM_ENTITY_DELETED,
  MODEL_DROP_TYPE,
  METAMODEL_DROP_TYPE,
  DIAGRAM_LINK_TARGET_SELECTED_EVENT,
} from './consts';
import { addLinks, addNodes } from './core/viewModelRenderer';
import RadicalDiagramModel from './core/RadicalDiagramModel';
import ToolbarMenu from '../components/canvas/ToolbarMenu';

const mapViewmodel = (viewmodel) => {
  const diagramModel = new RadicalDiagramModel();
  addNodes(diagramModel, viewmodel);
  addLinks(diagramModel, viewmodel);
  return diagramModel;
};
const useStyles = makeStyles(() => ({
  fill: {
    width: '100%',
    height: '100%',
  },
  fillCanvas: {
    width: '100%',
    height: '94%',
  },
}));

const RadicalCanvasWidget = ({
  viewmodel,
  alignment,
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
}) => {
  const classes = useStyles();
  const registerCallbacks = useCallback(
    () => ({
      eventDidFire: (e) => {
        switch (e.function) {
          case DRAG_DIAGRAM_ITEMS_END_EVENT:
            onDragItemsEnd(e.point, e.items);
            break;
          case LINK_CONNECTED_TO_TARGET_EVENT:
            onLinkConnected(e.sourceId, e.targetId);
            break;
          case DIAGRAM_ALIGNMENT_UPDATED_EVENT:
            onDiagramAlignmentUpdated(
              e.offsetX,
              e.offsetY,
              e.entity.options.zoom
            );
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
            onLinkConnected(e.source, e.target, e.type);
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
    ]
  );

  const [engine] = useState(createRadicalEngine());
  const [isModelSet, setIsModelSet] = useState(false);
  const [viewName, setViewName] = useState();
  useEffect(() => {
    setViewName(viewmodel.name);
    const model = mapViewmodel(viewmodel);
    model.registerListener(registerCallbacks());
    model.getNodes().forEach((node) => {
      node.registerListener(registerCallbacks());
    });
    model.getLinks().forEach((node) => {
      node.registerListener(registerCallbacks());
    });
    engine.setModel(model);
    model.setInitialZoomLevel(alignment.zoom);
    model.setInitialOffset(alignment.offsetX, alignment.offsetY);
    setIsModelSet(true);
  }, [viewmodel, alignment, engine, registerCallbacks]);
  const [, drop] = useDrop(() => ({
    accept: [MODEL_DROP_TYPE, METAMODEL_DROP_TYPE],
    drop: (item, monitor) => {
      const dropPoint = engine.getRelativeMousePoint({
        clientX: monitor.getClientOffset().x,
        clientY: monitor.getClientOffset().y,
      });
      if (item.type === MODEL_DROP_TYPE) {
        onAddObjectToView(item.id, dropPoint);
      } else {
        onAddMetamodelObjectToView(item.metamodelType, dropPoint);
      }
    },
  }));
  return (
    <>
      {engine && isModelSet && (
        <div className={classes.fill}>
          <ToolbarMenu
            onLayoutAlign={onLayoutAlign}
            onZoomToFit={() => engine.zoomToFitNodes({ margin: 50 })}
            name={viewName}
          />
          <div ref={drop} className={classes.fillCanvas}>
            <CanvasWidget
              className={[classes.fill, 'canvas-view'].join(' ')}
              engine={engine}
            />
          </div>
        </div>
      )}
    </>
  );
};
RadicalCanvasWidget.propTypes = {
  viewmodel: PropTypes.objectOf(PropTypes.any).isRequired,
  alignment: PropTypes.objectOf(PropTypes.any).isRequired,
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
};

export default React.memo(RadicalCanvasWidget);
