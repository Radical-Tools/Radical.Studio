import set from 'lodash/fp/set';

export const initialState = {
  notifications: [],
};

export const addNotification = (state, payload) =>
  set(['notifications'], [...state.notifications, payload], state);

export const removeNotifcation = (state, payload) =>
  set(
    ['notifications'],
    state.notifications.filter(
      (notification) => notification.id !== payload.id
    ),
    state
  );

export default initialState;

export const createError = (message, name) => {
  const error = new Error(message);
  error.name = name;
  return error;
};
