import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { save } from 'save-file';
import { v4 as uuidv4 } from 'uuid';
import { getStorageCombinedKey } from '../model/handlers/localStorage';
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
  VIEWMODEL_VIEW_ADD,
  VIEWMODEL_VIEW_CREATE,
  VIEWMODEL_VIEW_REMOVE,
  VIEWMODEL_VIEW_UPDATE,
  VIEWMODEL_NODE_ADD,
  VIEWMODEL_NODE_REMOVE,
  VIEWMODEL_NODE_UPDATE,
  VIEWMODEL_LINK_REMOVE,
  VIEWMODEL_LINK_ADD,
  VIEWMODEL_VIEW_EDIT,
  VIEWMODEL_VIEW_ACTIVATE,
  VIEWMODEL_VIEW_ALIGNMENT_UPDATE,
  VIEWMODEL_VIEW_LAYOUT_ALIGN,
  VIEWMODEL_NODE_COLLAPSE,
  VIEWMODEL_NODE_EXPAND,
  VIEWMODEL_METAMODELOBJECT_ADD,
  VIEWMODEL_ITEM_SELECTION_CHANGED,
  MODEL_ITEM_UPDATE_NAME,
  MODEL_OBJECT_DETACH,
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
  STATE_LOAD,
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

export const modelItemUpdateName = (id, type, name) => ({
  type: MODEL_ITEM_UPDATE_NAME,
  payload: { id, type, name },
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

export const initProject = createAction('project/init', (data) => ({
  payload: {
    ...data,
    version: process.env.REACT_APP_VERSION,
  },
}));

export const viewModelViewAdd = (name, tags) => ({
  type: VIEWMODEL_VIEW_ADD,
  payload: { name, tags },
});

export const viewModelViewRemove = (id) => ({
  type: VIEWMODEL_VIEW_REMOVE,
  payload: { id },
});

export const viewModelViewUpdate = (id, name, tags) => ({
  type: VIEWMODEL_VIEW_UPDATE,
  payload: { id, name, tags },
});

export const viewModelNodeAdd = (viewId, id, position, dimension) => ({
  type: VIEWMODEL_NODE_ADD,
  payload: { viewId, id, position, dimension },
});

export const viewModelMetamodelObjectAdd = (
  viewId,
  type,
  position,
  nodeInPlace
) => ({
  type: VIEWMODEL_METAMODELOBJECT_ADD,
  payload: { viewId, id: uuidv4(), type, position, nodeInPlace },
});

export const viewModelNodeRemove = (id) => ({
  type: VIEWMODEL_NODE_REMOVE,
  payload: { id },
});

export const viewModelNodeUpdate = (viewId, id, position, dimension) => ({
  type: VIEWMODEL_NODE_UPDATE,
  payload: { viewId, id, position, dimension },
});

export const viewModelLinkRemove = (id) => ({
  type: VIEWMODEL_LINK_REMOVE,
  payload: { id },
});

export const viewModelLinkAdd = (id) => ({
  type: VIEWMODEL_LINK_ADD,
  payload: { id },
});

export const viewModelViewCreate = () => ({
  type: VIEWMODEL_VIEW_CREATE,
  payload: {},
});

export const viewModelViewEdit = () => ({
  type: VIEWMODEL_VIEW_EDIT,
  payload: {},
});

export const viewModelViewActivate = (id) => ({
  type: VIEWMODEL_VIEW_ACTIVATE,
  payload: { id },
});

export const viewModelViewAlignmentUpdate = (offsetX, offsetY, zoom) => ({
  type: VIEWMODEL_VIEW_ALIGNMENT_UPDATE,
  payload: { offsetX, offsetY, zoom },
});

export const viewModelLayoutAlign = () => ({
  type: VIEWMODEL_VIEW_LAYOUT_ALIGN,
  payload: {},
});

export const viewModelNodeCollapse = (id) => ({
  type: VIEWMODEL_NODE_COLLAPSE,
  payload: { id },
});

export const viewModelNodeExpand = (id) => ({
  type: VIEWMODEL_NODE_EXPAND,
  payload: { id },
});

export const viewModelItemSelectionChanged = (id, type, isSelected) => ({
  type: VIEWMODEL_ITEM_SELECTION_CHANGED,
  payload: { id, type, isSelected },
});

export const modelObjectDetach = (id) => ({
  type: MODEL_OBJECT_DETACH,
  payload: { id },
});

export const notificationAdd = (message, type, name) => ({
  type: NOTIFICATION_ADD,
  payload: { id: uuidv4(), message, type, name },
});

export const notificationRemove = (id) => ({
  type: NOTIFICATION_REMOVE,
  payload: { id },
});

export const loadStateStorage = createAction('state/load/storage', (name) => {
  const serializedState = localStorage.getItem(getStorageCombinedKey(name));
  return {
    payload: serializedState ? JSON.parse(serializedState) : undefined,
  };
});

export const stateLoad = (state) => ({
  type: STATE_LOAD,
  payload: state,
});

export const stateSave = createAsyncThunk('state/save', async (_, thunkAPI) => {
  await save(JSON.stringify(thunkAPI.getState()), 'state.radical');
});

export const setWindowDimensions = createAction('layout/windowDimensions/set');
export const layoutWidgetRestore = createAction('layout/widget/restore');
