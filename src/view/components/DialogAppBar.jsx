import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Box from '@mui/material/Box';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';

const appBarStyle = {
  position: 'relative',
};
const titleStyle = {
  ml: 2,
  flex: 1,
};
const actionsContainerStyle = {
  marginLeft: 'auto',
};

const DialogAppBar = ({ closeAction, secondaryText }) => (
  <AppBar sx={appBarStyle}>
    <Toolbar>
      <WidgetsIcon />
      <Box display="flex" alignItems="flex-end">
        <Box>
          <Typography variant="h6" sx={titleStyle}>
            Radical.Studio
          </Typography>
        </Box>
        <Box ml={0.5}>
          <Typography variant="caption">
            v{process.env.REACT_APP_VERSION}
          </Typography>
        </Box>
        {secondaryText && (
          <Box>
            <Typography variant="h6" sx={titleStyle}>
              Admin Panel
            </Typography>
          </Box>
        )}
      </Box>
      {closeAction && (
        <Box sx={actionsContainerStyle}>
          <Tooltip
            title={<Typography variant="caption">Close (CTRL+Q)</Typography>}
          >
            <IconButton color="secondary" onClick={closeAction}>
              <CloseRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  </AppBar>
);
DialogAppBar.defaultProps = {
  secondaryText: undefined,
  closeAction: undefined,
};
DialogAppBar.propTypes = {
  secondaryText: PropTypes.string,
  closeAction: PropTypes.func,
};
export default DialogAppBar;
