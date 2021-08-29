import * as notifications from '../controller/handlers/notifications';
import initialState from './initialState';
import handlersMap from '../controller/handlersMap';
import { notificationAdd } from '../controller/actions/actionCreators';

const rootReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlersMap, action.type)) {
    try {
      return handlersMap[action.type](state, action.payload);
    } catch (error) {
      return notifications.addNotification(
        state,
        notificationAdd(error.message, 'error', error.name).payload
      );
    }
  }
  return state;
};

export default rootReducer;
