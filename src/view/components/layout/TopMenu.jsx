import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
} from '../../../app/consts';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));
const useToolbarStyles = makeStyles(() => ({
  root: (height) => ({
    minHeight: (height - LAYOUT_HEIGHT_OFFSET_FOR_MARGIN) / LAYOUT_MAX_ROWS,
    height: (height - LAYOUT_HEIGHT_OFFSET_FOR_MARGIN) / LAYOUT_MAX_ROWS,
  }),
}));
const useMenuButtonStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(0),
  },
}));

const TopMenu = ({
  onShowDrawer,
  undoCmd,
  redoCmd,
  isPrev,
  isNext,
  windowDimensions,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar classes={useToolbarStyles(windowDimensions.height)}>
          <IconButton
            onClick={onShowDrawer}
            edge="start"
            classes={useMenuButtonStyles()}
            color="secondary"
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
          <div className={classes.grow} />
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
    </div>
  );
};

TopMenu.propTypes = {
  onShowDrawer: PropTypes.func.isRequired,
  undoCmd: PropTypes.func.isRequired,
  redoCmd: PropTypes.func.isRequired,
  isPrev: PropTypes.bool.isRequired,
  isNext: PropTypes.bool.isRequired,
  windowDimensions: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TopMenu;
