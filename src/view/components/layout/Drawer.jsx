import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MaterialDrawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListIcon from '@material-ui/icons/List';
import toPairs from 'lodash/fp/toPairs';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import MenuWidgetListItem from './MenuWidgetListItem';
import FileReader from '../utils/FileReader';

const Drawer = ({
  widgetsConfig,
  show,
  onAddWidget,
  onClose,
  onLoadFile,
  onSave,
}) => {
  const handleSaveButtonClick = useCallback(() => {
    onSave();
    onClose();
  }, [onSave, onClose]);
  return (
    <MaterialDrawer anchor="left" open={show} onClose={onClose}>
      <List>
        <Box p={1}>
          <ListIcon fontSize="large" />
        </Box>
        <Divider />
        <ListItem button key="Save" onClick={handleSaveButtonClick}>
          <ListItemIcon>
            <SaveAltRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Save" />
        </ListItem>
        <ListItem button key="Load">
          <ListItemIcon>
            <PublishRoundedIcon />
          </ListItemIcon>
          <FileReader
            onDataChunk={(dataChunk) => onLoadFile(JSON.parse(dataChunk))}
            chunkSize={400000}
          />
        </ListItem>

        <Divider />
        {widgetsConfig && (
          <>
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
      </List>
      <Divider />
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
};
Drawer.defaultProps = {
  widgetsConfig: undefined,
  onAddWidget: () => {},
};
export default React.memo(Drawer);
