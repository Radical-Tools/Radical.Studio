import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import {
  DIAGRAM_ENTITY_DELETED,
  DIAGRAM_LINK_TARGET_SELECTED_EVENT,
  DIAGRAM_NODE_COLLAPSED,
  DIAGRAM_NODE_DETACHED,
  DIAGRAM_NODE_EXPANDED,
} from '../widgets/DiagramWidget/diagram/consts';
import {
  getCanvasNodeCollapseButton,
  getCanvasNodeDeleteButton,
  getCanvasNodeExpandButton,
  getCanvasNodePossibleRelation,
  getCanvasNodeRemoveButton,
} from '../../tests/getDataTestId';

const panelStyle = {
  position: 'absolute',
  bottom: 5,
  left: 10,
};
const roundedIconStyle = (isExpanded) => ({
  color: isExpanded ? '#595959' : 'white',
});

const NodeContextPanel = ({ node }) => (
  <Box sx={panelStyle}>
    {node.isSelected() && !node.options.isExpanded && node.options.isParent && (
      <Tooltip title="Expand Node" aria-label="expand">
        <IconButton
          data-testid={getCanvasNodeExpandButton(node.options.name)}
          size="small"
          className="controlEl"
          onClick={() => {
            node.fireEvent(
              {
                id: node.getID(),
              },
              DIAGRAM_NODE_EXPANDED
            );
          }}
        >
          <ZoomInRoundedIcon sx={roundedIconStyle(node.options.isExpanded)} />
        </IconButton>
      </Tooltip>
    )}
    {node.isSelected() && node.options.isExpanded && node.options.isParent && (
      <Tooltip title="Collapse Node" aria-label="collapse">
        <IconButton
          data-testid={getCanvasNodeCollapseButton(node.options.name)}
          size="small"
          className="controlEl"
          onClick={() => {
            node.fireEvent(
              {
                id: node.getID(),
              },
              DIAGRAM_NODE_COLLAPSED
            );
          }}
        >
          <ZoomOutRoundedIcon sx={roundedIconStyle(node.options.isExpanded)} />
        </IconButton>
      </Tooltip>
    )}
    {node.options.possibleRelations &&
      node.options.possibleRelations.types.map((type) => (
        <Tooltip key={type} title={`Create a ${type} relation`}>
          <Chip
            key={type}
            data-testid={getCanvasNodePossibleRelation(node.options.name, type)}
            className="controlEl"
            color="secondary"
            label={type}
            size="small"
            onClick={() => {
              node.fireEvent(
                {
                  id: node.options.possibleRelations.id,
                  source: node.options.possibleRelations.source,
                  target: node.getID(),
                  type,
                },
                DIAGRAM_LINK_TARGET_SELECTED_EVENT
              );
            }}
          />
        </Tooltip>
      ))}
    {node.isSelected() && node.parentNode && (
      <Tooltip title="Detach from parent" aria-label="detach">
        <IconButton
          size="small"
          className="controlEl"
          onClick={() => {
            node.fireEvent(
              {
                id: node.getID(),
              },
              DIAGRAM_NODE_DETACHED
            );
          }}
        >
          <LinkOffIcon sx={roundedIconStyle(node.options.isExpanded)} />
        </IconButton>
      </Tooltip>
    )}
    {node.isSelected() && (
      <Tooltip title="Delete from model" aria-label="delete">
        <IconButton
          data-testid={getCanvasNodeDeleteButton(node.options.name)}
          size="small"
          className="controlEl"
          onClick={() => {
            node.fireEvent(
              {
                entity: node,
                deleteFromModel: true,
              },
              DIAGRAM_ENTITY_DELETED
            );
          }}
        >
          <DeleteForeverRoundedIcon
            sx={roundedIconStyle(node.options.isExpanded)}
          />
        </IconButton>
      </Tooltip>
    )}
    {node.isSelected() && (
      <Tooltip title="Remove from view" aria-label="remove">
        <IconButton
          data-testid={getCanvasNodeRemoveButton(node.options.name)}
          size="small"
          className="controlEl"
          onClick={() => {
            node.fireEvent(
              {
                entity: node,
                deleteFromModel: false,
              },
              DIAGRAM_ENTITY_DELETED
            );
          }}
        >
          <VisibilityOffIcon sx={roundedIconStyle(node.options.isExpanded)} />
        </IconButton>
      </Tooltip>
    )}
  </Box>
);

NodeContextPanel.propTypes = {
  node: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default NodeContextPanel;
