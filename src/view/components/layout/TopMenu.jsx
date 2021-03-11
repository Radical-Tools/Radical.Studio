import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListIcon from '@material-ui/icons/List';
import MenuWidgetListItem from './MenuWidgetListItem';

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
const TopMenu = ({
  isThemeSwitchChecked,
  onChangeTheme,
  widgetsConfig,
  onAddWidget,
}) => {
  const classes = useStyles();
  const [showDrawer, setShowDrawer] = React.useState(false);

  const handleStartMenuClick = useCallback(() => {
    setShowDrawer(true);
  }, [setShowDrawer]);
  const handleMenuClose = useCallback(() => {
    setShowDrawer(false);
  }, [setShowDrawer]);
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar classes={useToolbarStyles()}>
          <IconButton
            onClick={handleStartMenuClick}
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
            <Switch checked={isThemeSwitchChecked} onChange={onChangeTheme} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={showDrawer} onClose={handleMenuClose}>
        <List>
          <Box p={1}>
            <ListIcon fontSize="large" />
          </Box>
          <Divider />
          {widgetsConfig && (
            <>
              <Typography variant="h6" noWrap>
                Toolbox
              </Typography>
              {widgetsConfig.map((widget) => (
                <MenuWidgetListItem
                  onAddWidget={onAddWidget}
                  key={widget.id}
                  id={widget.id}
                  isActive={widget.isActive}
                  title={widget.title}
                />
              ))}
            </>
          )}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

TopMenu.propTypes = {
  isThemeSwitchChecked: PropTypes.bool.isRequired,
  widgetsConfig: PropTypes.arrayOf(PropTypes.object),
  onChangeTheme: PropTypes.func.isRequired,
  onAddWidget: PropTypes.func,
};
TopMenu.defaultProps = {
  widgetsConfig: undefined,
  onAddWidget: () => {},
};
export default TopMenu;
