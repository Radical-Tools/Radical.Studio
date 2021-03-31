import {
  LAYOUT_GRID_SET,
  LAYOUT_WIDGET_ADD,
  LAYOUT_WIDGET_CLOSE,
  LAYOUT_WIDGET_MAXIMIZE,
  LAYOUT_WIDGET_MINIMIZE,
  LAYOUT_DRAWER_TOGGLE,
  LAYOUT_HOME_DIALOG_OPEN,
  LAYOUT_HOME_DIALOG_CLOSE,
  THEME_CHANGE,
  MODEL_OBJECT_ADD,
  MODEL_OBJECT_REMOVE,
  MODEL_RELATION_ADD,
  MODEL_RELATION_REMOVE,
  MODEL_OBJECT_UPDATE,
  MODEL_RELATION_UPDATE,
  MODEL_ITEM_EDIT,
  MODEL_ITEM_CREATE,
  MODEL_ITEM_UPSERT,
  MODEL_METAMODEL_SELECT,
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
export const layoutDrawerToggle = () => ({
  type: LAYOUT_DRAWER_TOGGLE,
});
export const layoutHomeDialogOpen = () => ({
  type: LAYOUT_HOME_DIALOG_OPEN,
});
export const layoutHomeDialogClose = () => ({
  type: LAYOUT_HOME_DIALOG_CLOSE,
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

export const modelObjectRemove = (id) => ({
  type: MODEL_OBJECT_REMOVE,
  payload: { id },
});
export const modelRelationRemove = (id) => ({
  type: MODEL_RELATION_REMOVE,
  payload: { id },
});

export const modelObjectUpdate = (id, name, attributes) => ({
  type: MODEL_OBJECT_UPDATE,
  payload: { id, name, attributes },
});

export const modelRelationUpdate = (id, name, attributes) => ({
  type: MODEL_RELATION_UPDATE,
  payload: { id, name, attributes },
});

export const modelItemCreate = (type) => ({
  type: MODEL_ITEM_CREATE,
  payload: { type },
});

export const modelItemEdit = (id, type) => ({
  type: MODEL_ITEM_EDIT,
  payload: { id, type },
});

export const modelItemUpsert = (type, item) => ({
  type: MODEL_ITEM_UPSERT,
  payload: { type, item },
});

export const modelMetamodelSelect = (metamodelId) => ({
  type: MODEL_METAMODEL_SELECT,
  payload: metamodelId,
});
