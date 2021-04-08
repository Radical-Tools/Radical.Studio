import React, { useState, useEffect, useCallback } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DiagramModel } from '@projectstorm/react-diagrams';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import createRadicalEngine from './core/createRadicalEngine';
import RadicalComposedNodeModel from './nodes/RadicalComposedNodeModel';
import DROP_DATA_KEY from './consts';

const preventDefault = (event) => event.preventDefault();
// just an example
const mapViewmodel = (viewmodel) => {
  const model = new DiagramModel();
  viewmodel.nodes.forEach((item) => {
    const node = new RadicalComposedNodeModel(item);
    model.addNode(node);
  });
  return model;
};
const useStyles = makeStyles(() => ({
  fill: {
    width: '100%',
    height: '100%',
  },
}));

const RadicalCanvasWidget = ({ viewmodel, onDrop }) => {
  const classes = useStyles();
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
    engine.setModel(mapViewmodel(viewmodel));
    setIsModelSet(true);
  }, [viewmodel, engine]);
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
};
export default React.memo(RadicalCanvasWidget);
