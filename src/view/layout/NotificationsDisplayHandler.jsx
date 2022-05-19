/* eslint-disable react/prop-types */
import React from 'react';
import difference from 'lodash/fp/difference';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';

let displayed = [];
const formatMessage = (message, name) =>
  name ? `${name}: ${message}` : message;

const dissmissButtonAction = (key, removeSnackbar) => (
  <Button onClick={() => removeSnackbar(key)}>Dismiss</Button>
);
const NotificationsDisplayHandler = ({ notifications, removeSnackbar }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = displayed.filter((key) => id !== key);
  };

  React.useEffect(() => {
    difference(
      displayed,
      notifications.map((n) => n.id)
    ).forEach((id) => closeSnackbar(id));
    notifications.forEach(({ id, message, type, name }) => {
      if (displayed.includes(id)) return;
      enqueueSnackbar(formatMessage(message, name), {
        key: id,
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        variant: type,
        onExited: (event, key) => {
          removeSnackbar(key);
          removeDisplayed(key);
        },
        action: (key) => dissmissButtonAction(key, removeSnackbar),
      });
      storeDisplayed(id);
    });
  }, [enqueueSnackbar, notifications, removeSnackbar, closeSnackbar]);

  return null;
};

export default NotificationsDisplayHandler;
