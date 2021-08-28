import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ZoomOutMapRoundedIcon from '@material-ui/icons/ZoomOutMapRounded';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import Typography from '@material-ui/core/Typography';
import ViewExportMenu from './ViewExportMenu';
import { getCanvasViewName } from '../../tests/getDataTestId';

function ToolbarMenu({ onLayoutAlign, onZoomToFit, name }) {
  return (
    <Box display="flex" flexShrink={0} boxShadow={0} height="36px">
      <Box width="100%" ml={1} mt={0.3}>
        <Typography data-testid={getCanvasViewName()} variant="h6">
          {name}
        </Typography>
      </Box>
      <Box flexShrink={0} mt={0.5} mr={0.5}>
        {onLayoutAlign && (
          <Tooltip title="Align Layout">
            <IconButton
              size="small"
              onClick={onLayoutAlign}
              edge="start"
              color="primary"
            >
              <AccountTreeRoundedIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Zoom to Fit">
          <IconButton
            size="small"
            onClick={onZoomToFit}
            edge="start"
            color="primary"
          >
            <ZoomOutMapRoundedIcon />
          </IconButton>
        </Tooltip>
        <ViewExportMenu name={name} />
      </Box>
    </Box>
  );
}

ToolbarMenu.defaultProps = {
  onLayoutAlign: undefined,
};

ToolbarMenu.propTypes = {
  onLayoutAlign: PropTypes.func,
  onZoomToFit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default ToolbarMenu;