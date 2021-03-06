import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import Typography from '@mui/material/Typography';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import values from 'lodash/fp/values';
import { getPortStyle } from '../helpers';
import EditableLabel from '../../../../components/EditableLabel';
import NodeContextPanel from '../../../../components/NodeContextPanel';
import { getCanvasNode } from '../../../../../tests/getDataTestId';
import NodeDescriptionIcon from '../../../../components/NodeDescriptionIcon';

const composedIconStyle = {
  position: 'absolute',
  width: 20,
  height: 20,
  left: 15,
  top: 10,
};
const smartPortStyle = {
  width: '16px',
  height: '16px',
};

const RadicalComposedNodeWidget = ({
  node,
  engine,
  children,
  isSelected,
  name,
  isExpanded,
  isAsymmetric,
}) => (
  <div data-testid={getCanvasNode(name)}>
    <div
      style={{
        position: 'relative',
        width: node.width,
        height: node.height,
        color: isExpanded ? '#2f2f2f' : '#ffffff',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: node.width,
          height: node.height,
          alignItems: isExpanded ? '' : 'center',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          top: isAsymmetric ? 20 : 0,
        }}
      >
        <NodeDescriptionIcon node={node} isParentAsymmetric={isAsymmetric} />
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginLeft: 7,
            marginRight: 7,
            top: isAsymmetric ? 20 : 0,
          }}
        >
          <EditableLabel
            editedItem={node}
            isItemSelected={isSelected}
            variant="body2"
            label={name}
            width={node.width - 14}
          />
          {node.options.attributes?.technology ? (
            <Typography variant="caption">
              [{node.options.radical_type}:{node.options.attributes?.technology}
              ]
            </Typography>
          ) : (
            <Typography noWrap variant="caption">
              [{node.options.radical_type}]
            </Typography>
          )}
        </div>
      </div>
      <svg width={node.width} height={node.height}>
        <g id="Layer_1">${children}</g>
      </svg>
      {values(node.getPorts()).map((port) => (
        <PortWidget
          style={getPortStyle(
            node.width,
            node.height,
            port.getOptions().alignment,
            port.order
          )}
          key={port.getOptions().name}
          port={port}
          engine={engine}
        >
          <Box sx={smartPortStyle} />
        </PortWidget>
      ))}
    </div>
    {!node.isLocked() && <NodeContextPanel node={node} />}
    {!node.isSelected() && !node.options.isExpanded && node.options.isParent && (
      <Box sx={composedIconStyle}>
        <AccountTreeIcon fontSize="small" />
      </Box>
    )}
  </div>
);

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
