import * as React from 'react';
import Box from '@material-ui/core/Box';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';
import ZoomOutRoundedIcon from '@material-ui/icons/ZoomOutRounded';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import LinkIcon from '@material-ui/icons/Link';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  DIAGRAM_ENTITY_DELETED,
  DIAGRAM_LINK_TARGET_SELECTED_EVENT,
  DIAGRAM_NODE_COLLAPSED,
  DIAGRAM_NODE_DETACHED,
  DIAGRAM_NODE_EXPANDED,
} from '../../diagram/consts';

const useStyles = (width) =>
  makeStyles({
    panel: {
      position: 'absolute',
      top: 0,
      left: width,
    },
  });

const NodeContextPanel = ({ node }) => {
  const classes = useStyles(node.size.width)();
  return (
    <Box className={classes.panel}>
      {node.isSelected() && !node.options.isExpanded && node.options.isParent && (
        <Tooltip title="Expand Node" aria-label="expand">
          <IconButton
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
            <ZoomInRoundedIcon />
          </IconButton>
        </Tooltip>
      )}
      {node.isSelected() && node.options.isExpanded && node.options.isParent && (
        <Tooltip title="Collapse Node" aria-label="collapse">
          <IconButton
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
            <ZoomOutRoundedIcon />
          </IconButton>
        </Tooltip>
      )}
      {node.options.possibleRelations &&
        node.options.possibleRelations.types.map((type) => (
          <Box key={type} m={1}>
            <Chip
              icon={<LinkIcon />}
              key={type}
              className="controlEl"
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
          </Box>
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
            <LinkOffIcon />
          </IconButton>
        </Tooltip>
      )}
      {node.isSelected() && (
        <Tooltip title="Delete from model" aria-label="delete">
          <IconButton
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
            <DeleteForeverRoundedIcon />
          </IconButton>
        </Tooltip>
      )}
      {node.isSelected() && (
        <Tooltip title="Remove from view" aria-label="remove">
          <IconButton
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
            <VisibilityOffIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

NodeContextPanel.propTypes = {
  node: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default NodeContextPanel;
