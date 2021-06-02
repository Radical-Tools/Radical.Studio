import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import ControlPointRoundedIcon from '@material-ui/icons/ControlPointRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import values from 'lodash/fp/values';
import { PORT_BORDER_RADIUS } from '../consts';
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
  onNodeExpanded,
  onNodeCollapsed,
}) => {
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
            onClick={(event) => {
              event.stopPropagation();
              onNodeExpanded(node.getID());
            }}
          >
            <ControlPointRoundedIcon />
          </IconButton>
        )}
        {node.size.width > 150 && node.options.isParent && (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              onNodeCollapsed(node.getID());
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
  onNodeCollapsed: PropTypes.func.isRequired,
  onNodeExpanded: PropTypes.func.isRequired,
};
export default RadicalComposedNodeWidget;
