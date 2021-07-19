import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import Typography from '@material-ui/core/Typography';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import values from 'lodash/fp/values';

import { getPortStyle } from '../helpers';
import EditableLabel from '../../components/canvas/EditableLabel';
import NodeContextPanel from '../../components/canvas/NodeContextPanel';

const useStyles = makeStyles({
  smartPort: {
    width: '16px',
    height: '16px',
  },
  detachPanel: {
    position: 'absolute',
    width: 20,
    height: 20,
    right: 15,
    bottom: 10,
  },
});
const RadicalComposedNodeWidget = ({
  node,
  engine,
  children,
  isSelected,
  name,
  isExpanded,
  isAsymmetric,
}) => {
  const classes = useStyles();
  return (
    <div data-testid={`node-widget-${name}`}>
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
            alignItems: isExpanded ? '' : 'center',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            top: isAsymmetric ? 20 : 0,
          }}
        >
          <div>
            <EditableLabel
              editedItem={node}
              isItemSelected={isSelected}
              variant="subtitle2"
              label={name}
              width={node.size.width}
            />
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
      <NodeContextPanel node={node} />
      {!node.isSelected() && !node.options.isExpanded && node.options.isParent && (
        <Box className={classes.detachPanel}>
          <AccountTreeIcon fontSize="small" />
        </Box>
      )}
    </div>
  );
};

RadicalComposedNodeWidget.propTypes = {
  node: PropTypes.objectOf(PropTypes.any).isRequired,
  engine: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.element.isRequired,
  isSelected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  isAsymmetric: PropTypes.bool.isRequired,
};
export default RadicalComposedNodeWidget;
