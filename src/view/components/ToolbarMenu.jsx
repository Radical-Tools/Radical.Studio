import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { Switch, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ZoomOutMapRoundedIcon from '@material-ui/icons/ZoomOutMapRounded';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import Typography from '@material-ui/core/Typography';
import ViewExportMenu from './ViewExportMenu';
import { getCanvasViewName } from '../../tests/getDataTestId';

function ToolbarMenu({
  onLayoutAlign,
  onZoomToFit,
  name,
  linkingEnabled,
  alignEnabled,
  zoomToFitEnabled,
  exportEnabled,
  linkingMode,
  onSetLinkingMode,
}) {
  return (
    <Box display="flex" flexShrink={0} boxShadow={0} height="36px">
      <Box width="100%" ml={1} mt={0.3}>
        <Typography
          data-testid={getCanvasViewName()}
          variant="subtitle1"
          color="primary"
        >
          {name}
        </Typography>
      </Box>
      <Box flexShrink={0} mt={0.5} mr={0.5}>
        {linkingEnabled && (
          <Tooltip title="Enable or Disable Linking Mode">
            <Switch
              checked={linkingMode}
              onChange={(event) => onSetLinkingMode(event.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Tooltip>
        )}
        {alignEnabled && (
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
        {zoomToFitEnabled && (
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
        )}
        {exportEnabled && <ViewExportMenu name={name} />}
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
  linkingEnabled: PropTypes.bool.isRequired,
  alignEnabled: PropTypes.bool.isRequired,
  zoomToFitEnabled: PropTypes.bool.isRequired,
  exportEnabled: PropTypes.bool.isRequired,
  linkingMode: PropTypes.bool.isRequired,
  onSetLinkingMode: PropTypes.func.isRequired,
};

export default ToolbarMenu;
