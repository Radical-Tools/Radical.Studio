import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import IconButton from '@material-ui/core/IconButton';

const MenuWidgetListItem = ({ id, isActive, title, onAddWidget }) => {
  const addWidgetCallback = useCallback(() => onAddWidget(id), [
    id,
    onAddWidget,
  ]);
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <IconButton disabled={isActive} onClick={addWidgetCallback}>
            <AddRoundedIcon />
          </IconButton>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} />
    </ListItem>
  );
};
MenuWidgetListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onAddWidget: PropTypes.func.isRequired,
};

export default MenuWidgetListItem;
