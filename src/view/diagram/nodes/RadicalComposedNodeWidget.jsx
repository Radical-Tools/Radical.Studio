import React, { useState, useEffect } from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import ControlPointRoundedIcon from '@material-ui/icons/ControlPointRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import values from 'lodash/fp/values';
import {
  DIAGRAM_NODE_COLLAPSED,
  DIAGRAM_NODE_EXPANDED,
  PORT_BORDER_RADIUS,
} from '../consts';
import { getPortStyle } from '../helpers';

const useStyles = makeStyles(() => ({
  smartPort: {
    width: '16px',
    height: '16px',
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: `${PORT_BORDER_RADIUS}px`,
    zIndex: 10,
    opacity: 0.3,
    '&:hover': {
      background: '#000000',
    },
  },
}));
const RadicalComposedNodeWidget = ({
  node,
  engine,
  children,
  isSelected,
  name,
}) => {
  const classes = useStyles();
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [currentName, setCurrentName] = useState('');
  useEffect(() => {
    if (isInEditMode && !isSelected) {
      setIsInEditMode(false);
      node.setLocked(false);
    }
    setCurrentName(name);
  }, [isSelected, isInEditMode, name, node]);
  return (
    <div id="main">
      <div
        style={{
          position: 'relative',
          width: node.size.width,
          height: node.size.height,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: node.size.width,
            height: node.size.height,
            alignItems: node.size.width === 150 ? 'center' : '',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 0,
          }}
        >
          <div>
            {isInEditMode && isSelected ? (
              <input
                style={{
                  width: '150px',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  textAlign: 'center',
                  fontSize: 16,
                }}
                autoComplete="off"
                onBlur={() => {
                  setIsInEditMode(false);
                  node.setLocked(false);
                }}
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    // console.log(event);
                    // console.log(event.key);
                  }
                }}
              />
            ) : (
              <Typography
                onDoubleClick={() => {
                  setIsInEditMode(true);
                  node.setLocked(true);
                }}
                variant="subtitle1"
              >
                {name}
              </Typography>
            )}

            <Divider />
            {node.options.attributes?.technology ? (
              <Typography variant="caption">
                [{node.options.radical_type}:
                {node.options.attributes?.technology}]
              </Typography>
            ) : (
              <Typography variant="caption">
                [{node.options.radical_type}]
              </Typography>
            )}

            <div>
              <Typography variant="caption">
                {node.options.attributes?.description}
              </Typography>
            </div>
          </div>
        </div>
        <svg width={node.size.width} height={node.size.height}>
          <g id="Layer_1">${children}</g>
        </svg>
        {values(node.getPorts()).map((port) => (
          <PortWidget
            style={getPortStyle(
              node.size.width,
              node.size.height,
              port.getOptions().alignment,
              port.order
            )}
            key={port.getOptions().name}
            port={port}
            engine={engine}
          >
            <div className={classes.smartPort} />
          </PortWidget>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: -7,
          left: node.size.width - 40,
        }}
      >
        {node.size.width === 150 && node.options.isParent && (
          <IconButton
            onClick={() => {
              node.fireEvent(
                {
                  id: node.getID(),
                },
                DIAGRAM_NODE_EXPANDED
              );
            }}
          >
            <ControlPointRoundedIcon />
          </IconButton>
        )}
        {node.size.width > 150 && node.options.isParent && (
          <IconButton
            onClick={() => {
              node.fireEvent(
                {
                  id: node.getID(),
                },
                DIAGRAM_NODE_COLLAPSED
              );
            }}
          >
            <RemoveCircleOutlineRoundedIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

RadicalComposedNodeWidget.propTypes = {
  node: PropTypes.objectOf(PropTypes.any).isRequired,
  engine: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.element.isRequired,
  isSelected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};
export default RadicalComposedNodeWidget;
