import React, { useState, useEffect, useCallback } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DiagramModel } from '@projectstorm/react-diagrams';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import createRadicalEngine from './core/createRadicalEngine';
import RadicalComposedNodeModel from './nodes/RadicalComposedNodeModel';
import {
  DRAG_DIAGRAM_ITEMS_END_EVENT,
  DROP_DATA_KEY,
  LINK_CONNECTED_TO_TARGET_EVENT,
  DIAGRAM_ALIGNMENT_UPDATED_EVENT,
} from './consts';

const addDevNodes = (model) => {
  const startPoint = {
    x: 700,
    y: 200,
  };
  const node = new RadicalComposedNodeModel({
    id: '1',
    radical_type: 'Container',
    name: 'Test name',
    attributes: {},
  });
  node.setPosition(startPoint);
  for (let index = 0; index < 40; index++) {
    const childNode = new RadicalComposedNodeModel({
      id: `Child ${index}`,
      radical_type: 'Component',
      name: `Child name ${index}`,
      attributes: {},
    });
    childNode.addParent(node);
    childNode.setPosition({
      x: startPoint.x + 20 * index,
      y: startPoint.y + 20 * index,
    });

    node.addNode(childNode);
    model.addNode(childNode);
  }
  node.setSize(500, 500);
  model.addNode(node);
};
const preventDefault = (event) => event.preventDefault();
// just an example
const mapViewmodel = (viewmodel) => {
  const model = new DiagramModel();
  Object.entries(viewmodel.nodes).forEach(([key, value]) => {
    const node = new RadicalComposedNodeModel({
      id: key,
      radical_type: value.type,
      name: value.name,
      attributes: value.attributes,
    });
    model.addNode(node);
  });
  addDevNodes(model);
  return model;
};
const useStyles = makeStyles(() => ({
  fill: {
    width: '100%',
    height: '100%',
  },
}));

const RadicalCanvasWidget = ({
  viewmodel,
  onDrop,
  onDragItemsEnd,
  onLinkConnected,
  onDiagramAlignmentUpdated,
}) => {
  const classes = useStyles();
  const registerCallbacks = useCallback(
    () => ({
      eventDidFire: (e) => {
        // eslint-disable-next-line no-console
        console.log(e);
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
          default:
            break;
        }
      },
    }),
    [onDragItemsEnd, onLinkConnected, onDiagramAlignmentUpdated]
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
    engine.setModel(model);
    setIsModelSet(true);
  }, [viewmodel, engine, registerCallbacks]);

  return (
    <>
      {engine && isModelSet && (
        <div
          className={classes.fill}
          onDrop={onDropCallback}
          onDragOver={preventDefault}
        >
          <CanvasWidget className={classes.fill} engine={engine} />
        </div>
      )}
    </>
  );
};
RadicalCanvasWidget.propTypes = {
  viewmodel: PropTypes.objectOf(PropTypes.any).isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragItemsEnd: PropTypes.func.isRequired,
  onLinkConnected: PropTypes.func.isRequired,
  onDiagramAlignmentUpdated: PropTypes.func.isRequired,
};
export default React.memo(RadicalCanvasWidget);
