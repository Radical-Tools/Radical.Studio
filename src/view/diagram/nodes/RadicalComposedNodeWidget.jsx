import * as React from 'react';
import { PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';

import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import values from 'lodash/fp/values';
import { PORTS_PER_NODE_SIDE } from '../consts';

const PORT_BORDER_RADIUS = 8;

const getPortStyle = (width, height, alignment, order) => {
  const style = { position: 'absolute' };
  const sideDivider = PORTS_PER_NODE_SIDE + 1;
  switch (alignment) {
    case PortModelAlignment.LEFT:
      style.top = (height / sideDivider) * order - PORT_BORDER_RADIUS;
      style.left = -PORT_BORDER_RADIUS;
      break;
    case PortModelAlignment.TOP:
      style.top = -PORT_BORDER_RADIUS;
      style.left = (width / sideDivider) * order - PORT_BORDER_RADIUS;
      break;
    case PortModelAlignment.RIGHT:
      style.top = (height / sideDivider) * order - PORT_BORDER_RADIUS;
      style.left = width - PORT_BORDER_RADIUS;
      break;
    case PortModelAlignment.BOTTOM:
      style.top = height - PORT_BORDER_RADIUS;
      style.left = (width / sideDivider) * order - PORT_BORDER_RADIUS;
      break;
    default:
      break;
  }
  return style;
};
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
const RadicalComposedNodeWidget = ({ node, engine, children }) => {
  const classes = useStyles();
  return (
    <div id="main">
      <div
        borderRadius={3}
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
            <Typography variant="subtitle1">{node.options.name}</Typography>

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

            <div flexWrap="wrap" fontStyle="italic" fontSize={8}>
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
            key={port.name}
            port={port}
            engine={engine}
          >
            <div className={classes.smartPort} />
          </PortWidget>
        ))}
      </div>
    </div>
  );
};

RadicalComposedNodeWidget.propTypes = {
  node: PropTypes.objectOf(PropTypes.any).isRequired,
  engine: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.element.isRequired,
};
export default RadicalComposedNodeWidget;
