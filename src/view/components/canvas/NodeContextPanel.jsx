import * as React from 'react';
import Box from '@material-ui/core/Box';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';
import ZoomOutRoundedIcon from '@material-ui/icons/ZoomOutRounded';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
  DIAGRAM_ENTITY_DELETED,
  DIAGRAM_LINK_TARGET_SELECTED_EVENT,
  DIAGRAM_NODE_COLLAPSED,
  DIAGRAM_NODE_DETACHED,
  DIAGRAM_NODE_EXPANDED,
} from '../../diagram/consts';
import {
  getCanvasNodeCollapseButton,
  getCanvasNodeDeleteButton,
  getCanvasNodeExpandButton,
  getCanvasNodePossibleRelation,
  getCanvasNodeRemoveButton,
} from '../../getDataTestId';

const useStyles = makeStyles(() => ({
  panel: () => ({
    position: 'absolute',
    bottom: 5,
    left: 10,
  }),
  iconNormal: {
    color: 'white',
  },
  iconExpanded: {
    color: '#595959',
  },
}));

const NodeContextPanel = ({ node }) => {
  const classes = useStyles();
  return (
    <Box className={classes.panel}>
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
            <ZoomInRoundedIcon
              className={
                node.options.isExpanded
                  ? classes.iconExpanded
                  : classes.iconNormal
              }
            />
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
            <ZoomOutRoundedIcon
              className={
                node.options.isExpanded
                  ? classes.iconExpanded
                  : classes.iconNormal
              }
            />
          </IconButton>
        </Tooltip>
      )}
      {node.options.possibleRelations &&
        node.options.possibleRelations.types.map((type) => (
          <Tooltip key={type} title={`Create a ${type} relation`}>
            <Chip
              key={type}
              data-testid={getCanvasNodePossibleRelation(
                node.options.name,
                type
              )}
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
            <LinkOffIcon
              className={
                node.options.isExpanded
                  ? classes.iconExpanded
                  : classes.iconNormal
              }
            />
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
              className={
                node.options.isExpanded
                  ? classes.iconExpanded
                  : classes.iconNormal
              }
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
            <VisibilityOffIcon
              className={
                node.options.isExpanded
                  ? classes.iconExpanded
                  : classes.iconNormal
              }
            />
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
