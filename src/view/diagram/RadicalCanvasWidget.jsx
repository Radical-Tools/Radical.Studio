import React, { useCallback, useEffect, useState } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { NodeModel } from '@projectstorm/react-diagrams';
import createRadicalEngine from './core/createRadicalEngine';
import {
  DIAGRAM_ALIGNMENT_UPDATED_EVENT,
  DRAG_DIAGRAM_ITEMS_END_EVENT,
  DROP_DATA_KEY,
  LINK_CONNECTED_TO_TARGET_EVENT,
  DIAGRAM_ENTITY_SELECTED,
} from './consts';
import { addLinks, addNodes } from './core/viewModelRenderer';
import RadicalDiagramModel from './core/RadicalDiagramModel';
import ToolbarMenu from '../components/canvas/ToolbarMenu';

const preventDefault = (event) => event.preventDefault();

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
  onDrop,
  onDragItemsEnd,
  onLinkConnected,
  onDiagramAlignmentUpdated,
  onNodeRemove,
  onLinkRemove,
  onLayoutAlign,
  onObjectRemove,
  onRelationRemove,
  onItemSelected,
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
            onLinkConnected(e.id, e.sourceId, e.targetId);
            break;
          case DIAGRAM_ALIGNMENT_UPDATED_EVENT:
            onDiagramAlignmentUpdated(
              e.offsetX,
              e.offsetY,
              e.entity.options.zoom
            );
            break;
          case DIAGRAM_ENTITY_SELECTED:
            if (e.isSelected) {
              onItemSelected(
                e.entity.getID(),
                e.entity instanceof NodeModel ? 'object' : 'relation'
              );
            }
            break;
          default:
            break;
        }
      },
    }),
    [onDragItemsEnd, onLinkConnected, onDiagramAlignmentUpdated, onItemSelected]
  );

  const onItemDeleteCallback = useCallback(
    (item, deleteFromModel) => {
      if (item instanceof NodeModel) {
        if (deleteFromModel) {
          onObjectRemove(item.getID());
        } else {
          onNodeRemove(item.getID());
        }
      } else if (deleteFromModel) {
        onRelationRemove(item.getID());
      } else {
        onLinkRemove(item.getID());
      }
    },
    [onNodeRemove, onLinkRemove, onObjectRemove, onRelationRemove]
  );

  const [engine] = useState(createRadicalEngine(onItemDeleteCallback));
  const [isModelSet, setIsModelSet] = useState(false);
  const [viewName, setViewName] = useState();
  const onDropCallback = useCallback(
    (event) => {
      const data = event.dataTransfer.getData(DROP_DATA_KEY);
      onDrop(
        engine.getRelativeMousePoint(event),
        data ? JSON.parse(data) : undefined
      );
    },
    [onDrop, engine]
  );

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

  return (
    <>
      {engine && isModelSet && (
        <div
          className={classes.fill}
          onDrop={onDropCallback}
          onDragOver={preventDefault}
        >
          <ToolbarMenu
            onLayoutAlign={onLayoutAlign}
            onZoomToFit={() => engine.zoomToFitNodes({ margin: 50 })}
            name={viewName}
          />
          <CanvasWidget
            className={[classes.fillCanvas, 'canvas-view'].join(' ')}
            engine={engine}
          />
        </div>
      )}
    </>
  );
};
RadicalCanvasWidget.propTypes = {
  viewmodel: PropTypes.objectOf(PropTypes.any).isRequired,
  alignment: PropTypes.objectOf(PropTypes.any).isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragItemsEnd: PropTypes.func.isRequired,
  onLinkConnected: PropTypes.func.isRequired,
  onDiagramAlignmentUpdated: PropTypes.func.isRequired,
  onNodeRemove: PropTypes.func.isRequired,
  onLinkRemove: PropTypes.func.isRequired,
  onObjectRemove: PropTypes.func.isRequired,
  onRelationRemove: PropTypes.func.isRequired,
  onLayoutAlign: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired,
};

export default React.memo(RadicalCanvasWidget);
