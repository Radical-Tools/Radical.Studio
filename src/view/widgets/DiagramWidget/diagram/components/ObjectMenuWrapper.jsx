import React, { useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import RadicalComposedNodeModel from '../nodes/RadicalComposedNodeModel';

const ObjectMenuWrapper = ({
  contextMenuCallbackRef,
  onNodeRestoreOutgoingLinks,
  engine,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [contextItemData, setContextItemData] = React.useState({});
  const open = Boolean(anchorEl);
  const restoreOutgoingLinks = () => {
    onNodeRestoreOutgoingLinks(contextItemData.id);
    setAnchorEl(null);
  };
  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    contextMenuCallbackRef.current = (e) => {
      const node = engine.getNodeAtPosition(e.clientX, e.clientY);
      if (node instanceof RadicalComposedNodeModel) {
        e.preventDefault();
        setAnchorEl(e.target);
        setContextItemData({
          id: node.getID(),
          name: node.getOptions().name,
        });
      }
    };
  }, [engine, contextMenuCallbackRef, setContextItemData]);
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={restoreOutgoingLinks}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem disabled>{contextItemData.name}</MenuItem>
      <MenuItem onClick={restoreOutgoingLinks}>Restore outgoint links</MenuItem>
    </Menu>
  );
};
ObjectMenuWrapper.propTypes = {
  contextMenuCallbackRef: PropTypes.objectOf(PropTypes.any).isRequired,
  engine: PropTypes.objectOf(PropTypes.any).isRequired,
  onNodeRestoreOutgoingLinks: PropTypes.func.isRequired,
};

export default ObjectMenuWrapper;
