import { THEME_DARK, THEME_LIGHT } from '../app/consts';
import * as layoutModel from '../model/layout';
import {
  LAYOUT_GRID_SET,
  LAYOUT_WIDGET_ADD,
  LAYOUT_WIDGET_CLOSE,
  LAYOUT_WIDGET_MAXIMIZE,
  LAYOUT_WIDGET_MINIMIZE,
  THEME_CHANGE,
} from './action-types';
import initialState from './initialState';

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_CHANGE:
      return {
        ...state,
        theme: {
          current:
            state.theme.current === THEME_DARK ? THEME_LIGHT : THEME_DARK,
        },
      };
    case LAYOUT_GRID_SET:
      return {
        ...state,
        layout: layoutModel.setGridLayout(state.layout, action.payload),
      };
    case LAYOUT_WIDGET_MAXIMIZE:
      return {
        ...state,
        layout: layoutModel.performMaximize(state.layout, action.payload),
      };
    case LAYOUT_WIDGET_MINIMIZE:
      return {
        ...state,
        layout: layoutModel.performMinimize(state.layout, action.payload),
      };
    case LAYOUT_WIDGET_CLOSE:
      return {
        ...state,
        layout: layoutModel.performClose(state.layout, action.payload),
      };
    case LAYOUT_WIDGET_ADD:
      return {
        ...state,
        layout: layoutModel.performAdd(state.layout, action.payload),
      };
    default:
      return state;
  }
};
export default rootReducer;
