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
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SlideshowRoundedIcon from '@material-ui/icons/SlideshowRounded';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
import MenuWidgetListItem from './MenuWidgetListItem';
import FileReader from '../components/FileReader';
import { LAYOUT_MODE } from '../../common/consts';

const Drawer = ({
  widgetsConfig,
  show,
  onAddWidget,
  onClose,
  onLoadFile,
  onSave,
  onSetMode,
  mode,
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
              title={<Typography variant="h6">Save To Local File</Typography>}
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
              title={<Typography variant="h6">Load Local File</Typography>}
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
        <Typography variant="subtitle2">Perspective</Typography>
        <Divider />
        <List>
          <ListItem key="Edit" selected={mode === LAYOUT_MODE.EDIT}>
            <Tooltip title={<Typography variant="h6">Design</Typography>}>
              <IconButton
                variant="contained"
                color="primary"
                component="label"
                onClick={() => onSetModeCallback(LAYOUT_MODE.EDIT)}
              >
                <EditRoundedIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem
            key="Presentation"
            selected={mode === LAYOUT_MODE.PRESENTATION}
          >
            <Tooltip title={<Typography variant="h6">Presentation</Typography>}>
              <IconButton
                variant="contained"
                color="primary"
                component="label"
                onClick={() => onSetModeCallback(LAYOUT_MODE.PRESENTATION)}
              >
                <SlideshowRoundedIcon />
              </IconButton>
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
  onSave: PropTypes.func.isRequired,
  onSetMode: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};
Drawer.defaultProps = {
  widgetsConfig: undefined,
  onAddWidget: () => {},
};
export default React.memo(Drawer);
