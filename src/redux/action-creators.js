import {
  LAYOUT_GRID_SET,
  LAYOUT_WIDGET_ADD,
  LAYOUT_WIDGET_CLOSE,
  LAYOUT_WIDGET_MAXIMIZE,
  LAYOUT_WIDGET_MINIMIZE,
  THEME_CHANGE,
  MODEL_OBJECT_ADD,
  MODEL_OBJECT_REMOVE,
  MODEL_RELATION_ADD,
  MODEL_RELATION_REMOVE,
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
export const modelObjectAdd = (id, type, name, attributes) => ({
  type: MODEL_OBJECT_ADD,
  payload: { id, type, name, attributes },
});
export const modelRelationAdd = (
  id,
  type,
  name,
  attributes,
  source,
  target
) => ({
  type: MODEL_RELATION_ADD,
  payload: { id, type, name, attributes, source, target },
});
export const modelObjectRemove = (objectId) => ({
  type: MODEL_OBJECT_REMOVE,
  payload: { objectId },
});
export const modelRelationRemove = (relationId) => ({
  type: MODEL_RELATION_REMOVE,
  payload: { relationId },
});
