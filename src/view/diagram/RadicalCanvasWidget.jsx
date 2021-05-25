import React, { useCallback, useEffect, useState } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { NodeModel } from '@projectstorm/react-diagrams';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import createRadicalEngine from './core/createRadicalEngine';
import {
  DIAGRAM_ALIGNMENT_UPDATED_EVENT,
  DIAGRAM_ENTITY_REMOVED,
  DRAG_DIAGRAM_ITEMS_END_EVENT,
  DROP_DATA_KEY,
  LINK_CONNECTED_TO_TARGET_EVENT,
} from './consts';
import { addLinks, addNodes } from './core/viewModelRenderer';
import RadicalDiagramModel from './core/RadicalDiagramModel';

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
    height: '100%',
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
          case DIAGRAM_ENTITY_REMOVED:
            if (e.entity instanceof NodeModel) {
              onNodeRemove(e.entity.getID());
            } else {
              onLinkRemove(e.entity.getID());
            }
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
      onNodeRemove,
      onLinkRemove,
    ]
  );
  const [engine] = useState(createRadicalEngine());
  const [isModelSet, setIsModelSet] = useState(false);
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
          <Box display="flex" flexShrink={0} boxShadow={1} height="45px">
            <Box width="100%" p={1} />
            <Box flexShrink={0}>
              <IconButton onClick={onLayoutAlign} edge="start" color="inherit">
                <AccountTreeRoundedIcon />
              </IconButton>
            </Box>
          </Box>
          <CanvasWidget className={classes.fillCanvas} engine={engine} />
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
  onLayoutAlign: PropTypes.func.isRequired,
};
export default React.memo(RadicalCanvasWidget);
