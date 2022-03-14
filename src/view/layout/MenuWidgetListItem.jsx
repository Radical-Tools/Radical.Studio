import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from '@mui/material/IconButton';
import { getWidgetListItem } from '../../tests/getDataTestId';

const MenuWidgetListItem = ({ id, isDisabled, title, onAddWidget }) => {
  const addWidgetCallback = useCallback(
    () => onAddWidget(id),
    [id, onAddWidget]
  );
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <IconButton
            data-testid={getWidgetListItem(id)}
            disabled={isDisabled}
            onClick={addWidgetCallback}
          >
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
  isDisabled: PropTypes.bool.isRequired,
  onAddWidget: PropTypes.func.isRequired,
};

export default MenuWidgetListItem;
