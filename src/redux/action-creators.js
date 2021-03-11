import {
  LAYOUT_GRID_SET,
  LAYOUT_WIDGET_ADD,
  LAYOUT_WIDGET_CLOSE,
  LAYOUT_WIDGET_MAXIMIZE,
  LAYOUT_WIDGET_MINIMIZE,
  THEME_CHANGE,
} from './action-types';

export const themeChanged = () => ({
  type: THEME_CHANGE,
});
export const layoutSet = (layout) => ({
  type: LAYOUT_GRID_SET,
  payload: layout,
});
export const layoutWidgetMaximize = (widgetId) => ({
  type: LAYOUT_WIDGET_MAXIMIZE,
  payload: widgetId,
});
export const layoutWidgetMinimize = (widgetId) => ({
  type: LAYOUT_WIDGET_MINIMIZE,
  payload: widgetId,
});
export const layoutWidgetClose = (widgetId) => ({
  type: LAYOUT_WIDGET_CLOSE,
  payload: widgetId,
});
export const layoutWidgetAdd = (widgetId) => ({
  type: LAYOUT_WIDGET_ADD,
  payload: widgetId,
});
