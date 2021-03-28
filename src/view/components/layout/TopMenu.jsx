import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));
const useToolbarStyles = makeStyles(() => ({
  root: {
    minHeight: 40,
  },
}));
const useMenuButtonStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(2),
  },
}));
const TopMenu = ({ isThemeSwitchChecked, onChangeTheme, onShowDrawer }) => {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar classes={useToolbarStyles()}>
          <IconButton
            onClick={onShowDrawer}
            edge="start"
            classes={useMenuButtonStyles()}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Radical.Studio
          </Typography>
          <div className={classes.grow} />
          <div>
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
};
export default TopMenu;
