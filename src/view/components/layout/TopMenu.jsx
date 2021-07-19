import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
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
    marginRight: theme.spacing(2),
  },
}));

const TopMenu = ({
  isThemeSwitchChecked,
  onChangeTheme,
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
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Box display="flex" alignItems="flex-end">
            <Box>
              <Typography variant="h6">Radical.Studio</Typography>
            </Box>
            <Box ml={0.5}>
              <Typography variant="caption">Beta</Typography>
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
            <Switch
              data-testid="theme-switch"
              checked={isThemeSwitchChecked}
              onChange={onChangeTheme}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

TopMenu.propTypes = {
  isThemeSwitchChecked: PropTypes.bool.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  onShowDrawer: PropTypes.func.isRequired,
  undoCmd: PropTypes.func.isRequired,
  redoCmd: PropTypes.func.isRequired,
  isPrev: PropTypes.bool.isRequired,
  isNext: PropTypes.bool.isRequired,
  windowDimensions: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TopMenu;
