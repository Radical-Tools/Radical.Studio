import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import MaterialDrawer from '@material-ui/core/Drawer';
import toPairs from 'lodash/fp/toPairs';
import ListItem from '@material-ui/core/ListItem';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import DesignServicesRoundedIcon from '@material-ui/icons/DesignServicesRounded';
import MovieCreationRoundedIcon from '@material-ui/icons/MovieCreationRounded';
import PlayCircleRoundedIcon from '@material-ui/icons/PlayCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import RotateLeftRoundedIcon from '@material-ui/icons/RotateLeftRounded';
import RotateRightRoundedIcon from '@material-ui/icons/RotateRightRounded';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Tooltip } from '@material-ui/core';
import MenuWidgetListItem from './MenuWidgetListItem';
import FileReader from '../components/FileReader';
import { LAYOUT_MODE } from '../../app/consts';

const Drawer = ({
  widgetsConfig,
  show,
  onAddWidget,
  onClose,
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
      <Box mt={2} p={1}>
        <Typography variant="subtitle2">File</Typography>
        <Divider />
        <List>
          <ListItem key="Save">
            <Tooltip
              placement="right"
              title={
                <Typography variant="caption">Save To Local File</Typography>
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
              title={<Typography variant="caption">Load Local File</Typography>}
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
      <Box mt={5} p={1}>
        <Typography variant="subtitle2">Perspectives</Typography>
        <Divider />
        <List>
          <ListItem key="Edit" selected={mode === LAYOUT_MODE.EDIT}>
            <Tooltip
              placement="right"
              title={<Typography variant="caption">Designer</Typography>}
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
                <Typography variant="caption">Presentation Creator</Typography>
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
              title={<Typography variant="caption">Presenter</Typography>}
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
      <Box mt={1} p={1}>
        <Typography variant="subtitle2">Undo/Redo</Typography>
        <Divider />
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
