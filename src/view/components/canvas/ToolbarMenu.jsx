import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ZoomOutMapRoundedIcon from '@material-ui/icons/ZoomOutMapRounded';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import Typography from '@material-ui/core/Typography';
import ViewExportMenu from './ViewExportMenu';

function ToolbarMenu({ onLayoutAlign, onZoomToFit, name }) {
  return (
    <Box display="flex" flexShrink={0} boxShadow={1} height="6%">
      <Box width="100%" p={1} alignItems="center">
        <Typography variant="h6">{name}</Typography>
      </Box>
      <Box flexShrink={0}>
        <Tooltip title="Align Layout">
          <IconButton onClick={onLayoutAlign} edge="start" color="inherit">
            <AccountTreeRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom to Fit">
          <IconButton onClick={onZoomToFit} edge="start" color="inherit">
            <ZoomOutMapRoundedIcon />
          </IconButton>
        </Tooltip>
        <ViewExportMenu name={name} />
      </Box>
    </Box>
  );
}

ToolbarMenu.propTypes = {
  onLayoutAlign: PropTypes.func.isRequired,
  onZoomToFit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default ToolbarMenu;
