import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import Typography from '@material-ui/core/Typography';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import IconButton from '@material-ui/core/IconButton';

import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import values from 'lodash/fp/values';
import {
  DIAGRAM_LINK_TARGET_SELECTED_EVENT,
  DIAGRAM_NODE_COLLAPSED,
  DIAGRAM_NODE_DETACHED,
  DIAGRAM_NODE_EXPANDED,
} from '../consts';
import { getPortStyle } from '../helpers';
import CollapsePanel from '../../components/canvas/CollapsePanel';
import LinkingPanel from '../../components/canvas/LinkingPanel';
import EditableLabel from '../../components/canvas/EditableLabel';

const useStyles = makeStyles(() => ({
  smartPort: {
    width: '16px',
    height: '16px',
  },
  linkingPanel: {
    position: 'absolute',
    width: '100%',
    height: 30,
    bottom: 0,
    left: '5%',
  },
  detachPanel: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 0,
  },
}));
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
              variant="subtitle1"
              label={name}
            />
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
      <CollapsePanel
        size={node.size}
        isParent={node.options.isParent}
        onExpand={() => {
          node.fireEvent(
            {
              id: node.getID(),
            },
            DIAGRAM_NODE_EXPANDED
          );
        }}
        onCollapse={() => {
          node.fireEvent(
            {
              id: node.getID(),
            },
            DIAGRAM_NODE_COLLAPSED
          );
        }}
      />
      <div className={classes.linkingPanel}>
        {node.options.possibleRelations &&
          node.options.possibleRelations.types.map((type) => (
            <LinkingPanel
              key={type}
              label={type}
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
          ))}
      </div>
      <div className={classes.detachPanel}>
        {node.parentNode && (
          <IconButton
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
  isExpanded: PropTypes.bool.isRequired,
  isAsymmetric: PropTypes.bool.isRequired,
};
export default RadicalComposedNodeWidget;
