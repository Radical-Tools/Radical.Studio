import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import WidgetsIcon from '@material-ui/icons/Widgets';
import Box from '@material-ui/core/Box';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';

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
