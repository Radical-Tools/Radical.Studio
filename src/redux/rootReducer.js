import { THEME_CHANGE } from './action-types';
import initialState from './initialState';

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_CHANGE:
      return {
        ...state,
        theme: {
          current: state.theme.current === 'dark' ? 'light' : 'dark',
        },
      };
    default:
      return {
        ...state,
      };
  }
};
export default rootReducer;
