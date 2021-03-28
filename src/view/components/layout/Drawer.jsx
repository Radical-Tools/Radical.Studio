import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MaterialDrawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListIcon from '@material-ui/icons/List';
import toPairs from 'lodash/fp/toPairs';
import MenuWidgetListItem from './MenuWidgetListItem';

const Drawer = ({ widgetsConfig, show, onAddWidget, onClose }) => (
  <MaterialDrawer anchor="left" open={show} onClose={onClose}>
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

Drawer.propTypes = {
  widgetsConfig: PropTypes.objectOf(PropTypes.any),
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddWidget: PropTypes.func,
};
Drawer.defaultProps = {
  widgetsConfig: undefined,
  onAddWidget: () => {},
};
export default React.memo(Drawer);
