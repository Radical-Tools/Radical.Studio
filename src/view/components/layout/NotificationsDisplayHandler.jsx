import React from 'react';
import { useSnackbar } from 'notistack';

const NotificationsDisplayHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    enqueueSnackbar('test', {
      key: 'AAAA',
      ...{ anchorOrigin: { vertical: 'bottom', horizontal: 'right' } },
      onClose: (event, reason, myKey) => {
        // eslint-disable-next-line no-console
        console.log('on close', event, reason, myKey);
      },
      onExited: (event, myKey) => {
        // eslint-disable-next-line no-console
        console.log('on exited', event, myKey);
      },
    });
  }, [enqueueSnackbar]);

  return null;
};

export default NotificationsDisplayHandler;
