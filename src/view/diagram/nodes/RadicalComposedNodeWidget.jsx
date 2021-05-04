import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';

import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  smartPort: {
    width: '16px',
    height: '16px',
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
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

        <PortWidget
          style={{
            top: node.size.height / 2 - 8,
            left: -8,
            position: 'absolute',
          }}
          port={node.getPort('left')}
          engine={engine}
        >
          <div className={classes.smartPort} />
        </PortWidget>
        <PortWidget
          style={{
            left: node.size.width / 2 - 8,
            top: -8,
            position: 'absolute',
          }}
          port={node.getPort('top')}
          engine={engine}
        >
          <div className={classes.smartPort} />
        </PortWidget>
        <PortWidget
          style={{
            left: node.size.width - 8,
            top: node.size.height / 2 - 8,
            position: 'absolute',
          }}
          port={node.getPort('right')}
          engine={engine}
        >
          <div className={classes.smartPort} />
        </PortWidget>
        <PortWidget
          style={{
            left: node.size.width / 2 - 8,
            top: node.size.height - 8,
            position: 'absolute',
          }}
          port={node.getPort('bottom')}
          engine={engine}
        >
          <div className={classes.smartPort} />
        </PortWidget>
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