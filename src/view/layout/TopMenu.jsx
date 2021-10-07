import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import WidgetsIcon from '@material-ui/icons/Widgets';
import RotateLeftRoundedIcon from '@material-ui/icons/RotateLeftRounded';
import RotateRightRoundedIcon from '@material-ui/icons/RotateRightRounded';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {
  LAYOUT_HEIGHT_OFFSET_FOR_MARGIN,
  LAYOUT_MAX_ROWS,
} from '../../app/consts';
import HistoryTimeline from '../components/HistoryTimeline';

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
  jumpCmd,
  windowDimensions,
  lockCmd,
  history,
  historyUndoCmd,
  historyRedoCmd,
  changeNameCmd,
  historyEnabled,
  undoCmd,
  redoCmd,
  isUndoFirst,
  isUndoLast,
}) => (
  <Box sx={growStyle}>
    <AppBar position="static">
      <Toolbar sx={toolbarStyle(windowDimensions.height)}>
        <IconButton
          onClick={onShowDrawer}
          edge="start"
          sx={menuButtonStyle}
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
            <Typography variant="caption">
              v{process.env.REACT_APP_VERSION}
            </Typography>
          </Box>
        </Box>
        <ButtonGroup
          orientation="horizontal"
          aria-label="steps navigation group"
          variant="text"
          size="small"
          color="inherit"
        >
          <Button
            disabled={isUndoFirst}
            onClick={() => undoCmd()}
            color="inherit"
          >
            <RotateLeftRoundedIcon />
          </Button>
          <Button
            disabled={isUndoLast}
            onClick={() => redoCmd()}
            color="inherit"
          >
            <RotateRightRoundedIcon />
          </Button>
        </ButtonGroup>
        <Box sx={growStyle} />
        <div>
          {historyEnabled && (
            <HistoryTimeline
              history={history}
              jumpCmd={jumpCmd}
              lockCmd={lockCmd}
              undoCmd={historyUndoCmd}
              redoCmd={historyRedoCmd}
              changeNameCmd={changeNameCmd}
            />
          )}
        </div>
      </Toolbar>
    </AppBar>
  </Box>
);

TopMenu.propTypes = {
  onShowDrawer: PropTypes.func.isRequired,
  jumpCmd: PropTypes.func.isRequired,
  windowDimensions: PropTypes.objectOf(PropTypes.any).isRequired,
  lockCmd: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  historyUndoCmd: PropTypes.func.isRequired,
  historyRedoCmd: PropTypes.func.isRequired,
  changeNameCmd: PropTypes.func.isRequired,
  historyEnabled: PropTypes.bool.isRequired,
  undoCmd: PropTypes.func.isRequired,
  redoCmd: PropTypes.func.isRequired,
  isUndoFirst: PropTypes.bool.isRequired,
  isUndoLast: PropTypes.bool.isRequired,
};

export default TopMenu;
