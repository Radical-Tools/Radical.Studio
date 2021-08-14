import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MaterialDrawer from '@material-ui/core/Drawer';
import toPairs from 'lodash/fp/toPairs';
import ListItem from '@material-ui/core/ListItem';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';
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
    <MaterialDrawer
      anchor="left"
      open={show}
      onClose={onClose}
      variant="temporary"
      BackdropProps={{ invisible: true }}
    >
      <List>
        <ListItem key="Save">
          <Tooltip title="save">
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
          <Tooltip title="load">
            <IconButton variant="contained" color="primary" component="label">
              <FileReader
                onDataChunk={(dataChunk) => onLoadFile(JSON.parse(dataChunk))}
                chunkSize={400000}
              />
              <PublishRoundedIcon />
            </IconButton>
          </Tooltip>
        </ListItem>
        <Divider />

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
      </List>
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
