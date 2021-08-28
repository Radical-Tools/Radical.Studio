import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Typography from '@material-ui/core/Typography';
import WidgetsIcon from '@material-ui/icons/Widgets';
import Box from '@material-ui/core/Box';
import {
  LAYOUT_HEIGHT_OFFSET_FOR_MARGIN,
  LAYOUT_MAX_ROWS,
} from '../../common/consts';

const growStyle = {
  flexGrow: 1,
};
const toolbarStyle = (height) => ({
  minHeight: `${
    (height - LAYOUT_HEIGHT_OFFSET_FOR_MARGIN) / LAYOUT_MAX_ROWS
  }px !important`, // TODO: important needed because of completely changed new styles behaviour css scope
  height: `${
    (height - LAYOUT_HEIGHT_OFFSET_FOR_MARGIN) / LAYOUT_MAX_ROWS
  }px !important`,
});

const menuButtonStyle = {
  mr: 0,
};
const TopMenu = ({
  onShowDrawer,
  undoCmd,
  redoCmd,
  isPrev,
  isNext,
  windowDimensions,
}) => (
  <Box sx={growStyle}>
    <AppBar position="static">
      <Toolbar sx={toolbarStyle(windowDimensions.height)}>
        <IconButton
          onClick={onShowDrawer}
          edge="start"
          sx={menuButtonStyle}
          color="inherit"
          aria-label="open drawer"
        >
          <WidgetsIcon />
        </IconButton>
        <Box display="flex" alignItems="flex-end">
          <Box>
            <Typography variant="h6">Radical.Studio</Typography>
          </Box>
          <Box ml={0.5}>
            <Typography variant="caption">v0.1</Typography>
          </Box>
        </Box>
        <Box sx={growStyle} />
        <div>
          <IconButton disabled={!isPrev} onClick={undoCmd} color="inherit">
            <ArrowBackIosRoundedIcon />
          </IconButton>
          <IconButton disabled={!isNext} onClick={redoCmd} color="inherit">
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  </Box>
);

TopMenu.propTypes = {
  onShowDrawer: PropTypes.func.isRequired,
  undoCmd: PropTypes.func.isRequired,
  redoCmd: PropTypes.func.isRequired,
  isPrev: PropTypes.bool.isRequired,
  isNext: PropTypes.bool.isRequired,
  windowDimensions: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TopMenu;
