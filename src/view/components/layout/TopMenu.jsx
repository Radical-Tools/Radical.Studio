import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ButtonGroup } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import RedoRoundedIcon from '@material-ui/icons/RedoRounded';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { undo, redo } from 'redux-deep-diff';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';

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

const mapDispatchToProps = (dispatch) => ({
  undoCmd: () => dispatch(undo()),
  redoCmd: () => dispatch(redo()),
});

const mapStateToProps = (state) => ({
  isPrev: state.diff.prev.length > 0,
  isNext: state.diff.next.length > 0,
});

const TopMenu = ({
  isThemeSwitchChecked,
  onChangeTheme,
  onShowDrawer,
  undoCmd,
  redoCmd,
  isPrev,
  isNext,
}) => {
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
          <div className={classes.grow}>
            <ButtonGroup
              size="medium"
              variant="contained"
              color="primary"
              aria-label="undo redo"
            >
              <IconButton disabled={!isPrev} onClick={undoCmd} color="inherit">
                <UndoRoundedIcon />
              </IconButton>
              <IconButton disabled={!isNext} onClick={redoCmd} color="inherit">
                <RedoRoundedIcon />
              </IconButton>
            </ButtonGroup>
          </div>
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
  undoCmd: PropTypes.func.isRequired,
  redoCmd: PropTypes.func.isRequired,
  isPrev: PropTypes.bool.isRequired,
  isNext: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
