import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Box from '@mui/material/Box';
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
  historyRollbackCmd,
  changeNameCmd,
  historyEnabled,
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
        <Box sx={growStyle} />
        <div>
          {historyEnabled && (
            <HistoryTimeline
              rollbackCmd={historyRollbackCmd}
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
  historyRollbackCmd: PropTypes.func.isRequired,
  changeNameCmd: PropTypes.func.isRequired,
  historyEnabled: PropTypes.bool.isRequired,
};

export default TopMenu;
