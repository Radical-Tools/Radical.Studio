import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MaterialDrawer from '@mui/material/Drawer';
import toPairs from 'lodash/fp/toPairs';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import IconButton from '@mui/material/IconButton';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';
import DesktopMacRounded from '@mui/icons-material/DesktopMacRounded';
import MenuWidgetListItem from './MenuWidgetListItem';
import FileReader from '../components/FileReader';
import { LAYOUT_MODE } from '../../app/consts';

const Drawer = ({
  widgetsConfig,
  show,
  onAddWidget,
  onClose,
  onToggleAdminDialog,
  onLoadFile,
  onSave,
  onSetMode,
  mode,
  isShowModeEnabled,
  isPresentationModeEnabled,
  undoCmd,
  redoCmd,
  isUndoFirst,
  isUndoLast,
}) => {
  const handleSaveButtonClick = useCallback(() => {
    onSave();
    onClose();
  }, [onSave, onClose]);

  const onSetModeCallback = useCallback(
    (newMode) => {
      onSetMode(newMode);
    },
    [onSetMode]
  );

  return (
    <MaterialDrawer
      anchor="left"
      open={show}
      onClose={onClose}
      variant="temporary"
      BackdropProps={{ invisible: true }}
    >
      <Box>
        <List>
          <ListItem key="Save">
            <Tooltip
              placement="right"
              title={
                <Typography variant="caption">
                  Save Project To Local File
                </Typography>
              }
            >
              <IconButton
                variant="contained"
                color="primary"
                component="label"
                onClick={handleSaveButtonClick}
              >
                <SaveAltRoundedIcon />
              </IconButton>
            </Tooltip>
          </ListItem>

          <ListItem key="Load">
            <Tooltip
              placement="right"
              title={
                <Typography variant="caption">
                  Load Project From Local File
                </Typography>
              }
            >
              <IconButton variant="contained" color="primary" component="label">
                <FileReader
                  onDataChunk={(dataChunk) => onLoadFile(JSON.parse(dataChunk))}
                  chunkSize={400000}
                />
                <FileCopyRoundedIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
        <Divider />
      </Box>
      <Box>
        <List>
          <ListItem key="Edit" selected={mode === LAYOUT_MODE.EDIT}>
            <Tooltip
              placement="right"
              title={<Typography variant="caption">Open Designer</Typography>}
            >
              <IconButton
                variant="contained"
                color={mode === LAYOUT_MODE.EDIT ? 'secondary' : 'primary'}
                component="label"
                onClick={() => onSetModeCallback(LAYOUT_MODE.EDIT)}
              >
                <DesignServicesRoundedIcon style={{ fontSize: 25 }} />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem
            key="Presentation"
            selected={mode === LAYOUT_MODE.PRESENTATION}
          >
            <Tooltip
              placement="right"
              title={
                <Typography variant="caption">
                  Open Presentation Creator
                </Typography>
              }
            >
              <span>
                <IconButton
                  disabled={!isPresentationModeEnabled}
                  variant="contained"
                  color={
                    mode === LAYOUT_MODE.PRESENTATION ? 'secondary' : 'primary'
                  }
                  component="label"
                  onClick={() => onSetModeCallback(LAYOUT_MODE.PRESENTATION)}
                >
                  <MovieCreationRoundedIcon style={{ fontSize: 25 }} />
                </IconButton>
              </span>
            </Tooltip>
          </ListItem>
          <ListItem key="Show" selected={mode === LAYOUT_MODE.SHOW}>
            <Tooltip
              placement="right"
              title={<Typography variant="caption">Open Presenter</Typography>}
            >
              <span>
                <IconButton
                  disabled={!isShowModeEnabled}
                  variant="contained"
                  color={mode === LAYOUT_MODE.SHOW ? 'secondary' : 'primary'}
                  component="label"
                  onClick={() => onSetModeCallback(LAYOUT_MODE.SHOW)}
                >
                  <PlayCircleRoundedIcon style={{ fontSize: 25 }} />
                </IconButton>
              </span>
            </Tooltip>
          </ListItem>
        </List>

        <Divider />
      </Box>
      <Box>
        <List>
          <ListItem key="undo">
            <Tooltip
              placement="right"
              title={
                <Typography variant="caption">
                  Undo Last Action (CTRL+Z)
                </Typography>
              }
            >
              <span>
                <IconButton
                  disabled={isUndoFirst}
                  onClick={undoCmd}
                  color="inherit"
                >
                  <RotateLeftRoundedIcon style={{ fontSize: 30 }} />
                </IconButton>
              </span>
            </Tooltip>
          </ListItem>
          <ListItem key="redo">
            <Tooltip
              placement="right"
              title={
                <Typography variant="caption">
                  Redo Last Action (CTRL+Y)
                </Typography>
              }
            >
              <span>
                <IconButton
                  disabled={isUndoLast}
                  onClick={redoCmd}
                  color="inherit"
                >
                  <RotateRightRoundedIcon style={{ fontSize: 30 }} />
                </IconButton>
              </span>
            </Tooltip>
          </ListItem>
        </List>
        <Divider />
      </Box>
      <Box>
        <List>
          <ListItem key="admin">
            <Tooltip
              placement="right"
              title={
                <Typography variant="caption">
                  Open Administration Panel (CTRL+Q)
                </Typography>
              }
            >
              <span>
                <IconButton onClick={onToggleAdminDialog} color="inherit">
                  <DesktopMacRounded style={{ fontSize: 30 }} />
                </IconButton>
              </span>
            </Tooltip>
          </ListItem>
        </List>
        <Divider />
      </Box>
      <Box>
        {widgetsConfig && (
          <>
            <Divider />
            <Typography variant="h6" noWrap>
              Toolbox
            </Typography>
            {toPairs(widgetsConfig).map(([key, widget]) => (
              <MenuWidgetListItem
                onAddWidget={onAddWidget}
                key={key}
                id={key}
                isDisabled={widget.isActive}
                title={widget.title}
              />
            ))}
          </>
        )}
      </Box>
    </MaterialDrawer>
  );
};

Drawer.propTypes = {
  widgetsConfig: PropTypes.objectOf(PropTypes.any),
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddWidget: PropTypes.func,
  onLoadFile: PropTypes.func.isRequired,
  onToggleAdminDialog: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSetMode: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  isShowModeEnabled: PropTypes.bool.isRequired,
  isPresentationModeEnabled: PropTypes.bool.isRequired,
  undoCmd: PropTypes.func.isRequired,
  redoCmd: PropTypes.func.isRequired,
  isUndoFirst: PropTypes.bool.isRequired,
  isUndoLast: PropTypes.bool.isRequired,
};
Drawer.defaultProps = {
  widgetsConfig: undefined,
  onAddWidget: () => {},
};
export default React.memo(Drawer);
