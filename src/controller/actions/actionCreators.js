import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { save } from 'save-file';
import { v4 as uuidv4 } from 'uuid';
import { getStorageCombinedKey } from '../handlers/localStorage';

export const themeChanged = createAction('theme/change');

export const layoutSet = createAction('layout/grid/set', (layout) => ({
  payload: layout,
}));
export const layoutWidgetMaximize = createAction(
  'layout/widget/maximize',
  (widgetId) => ({
    payload: widgetId,
  })
);
export const layoutWidgetMinimize = createAction(
  'layout/widget/minimize',
  (widgetId) => ({
    payload: widgetId,
  })
);
export const layoutWidgetClose = createAction(
  'layout/widget/close',
  (widgetId) => ({
    payload: widgetId,
  })
);
export const layoutWidgetAdd = createAction(
  'layout/widget/add',
  (widgetId) => ({
    payload: widgetId,
  })
);
export const layoutDrawerToggle = createAction('layout/drawer/toggle');

export const layoutHomeDialogOpen = createAction('layout/home-dialog/open');

export const layoutHomeDialogClose = createAction('layout/home-dialog/close');

export const modelObjectAdd = createAction(
  'model/object/add',
  (id = uuidv4(), type, name, attributes) => ({
    payload: { id, type, name, attributes },
  })
);
export const modelRelationAdd = createAction(
  'model/relation/add',
  (id = uuidv4(), type, name, attributes, source, target) => ({
    payload: { id, type, name, attributes, source, target },
  })
);

export const modelObjectRemove = createAction('model/object/remove', (id) => ({
  payload: { id },
}));
export const modelRelationRemove = createAction(
  'model/relation/remove',
  (id) => ({
    payload: { id },
  })
);

export const modelObjectUpdate = createAction(
  'model/object/update',
  (id, name, attributes) => ({
    payload: { id, name, attributes },
  })
);

export const modelItemUpdateName = createAction(
  'model/item/update/name',
  (id, type, name) => ({
    payload: { id, type, name },
  })
);

export const modelRelationUpdate = createAction(
  'model/relation/update',
  (id, name, attributes) => ({
    payload: { id, name, attributes },
  })
);

export const modelItemCreate = createAction('model/item/create', (type) => ({
  payload: { type },
}));

export const modelItemEdit = createAction('model/item/edit', (id, type) => ({
  payload: { id, type },
}));

export const modelItemUpsert = createAction(
  'model/item/upsert',
  (type, item) => ({
    payload: { type, item: { ...item, id: item.id ? item.id : uuidv4() } },
  })
);
export const initProject = createAction('project/init', (data) => ({
  payload: {
    ...data,
    version: process.env.REACT_APP_VERSION,
  },
}));

export const viewModelViewAdd = createAction(
  'viewmodel/view/add',
  (name, id = uuidv4(), tags) => ({
    payload: { name, id, tags },
  })
);

export const viewModelViewRemove = createAction(
  'viewmodel/view/remove',
  (id) => ({
    payload: { id },
  })
);

export const viewModelViewUpdate = createAction(
  'viewmodel/view/update',
  (id, name, tags) => ({
    payload: { id, name, tags },
  })
);
export const viewModelNodeAdd = createAction(
  'viewmodel/node/add',
  (viewId, id, position, dimension) => ({
    payload: { viewId, id, position, dimension },
  })
);

export const viewModelMetamodelObjectAdd = createAction(
  'viewmodel/metamodelobject/add',
  (viewId, type, position, nodeInPlace) => ({
    payload: { viewId, id: uuidv4(), type, position, nodeInPlace },
  })
);

export const viewModelNodeRemove = createAction(
  'viewmodel/node/remove',
  (id) => ({
    payload: { id },
  })
);

export const viewModelNodeUpdate = createAction(
  'viewmodel/node/update',
  (viewId, id, position, dimension) => ({
    payload: { viewId, id, position, dimension },
  })
);

export const viewModelLinkRemove = createAction(
  'viewmodel/link/remove',
  (id) => ({
    payload: { id },
  })
);

export const viewModelLinkAdd = createAction('viewmodel/link/add', (id) => ({
  payload: { id },
}));

export const viewModelViewCreate = createAction('viewmodel/view/create');

export const viewModelViewEdit = createAction('viewmodel/view/edit');

export const viewModelViewActivate = createAction(
  'viewmodel/view/activate',
  (id) => ({
    payload: { id },
  })
);

export const viewModelViewAlignmentUpdate = createAction(
  'viewmodel/view/alignment/update',
  (offsetX, offsetY, zoom) => ({
    payload: { offsetX, offsetY, zoom },
  })
);

export const viewModelLayoutAlign = createAction('viewmodel/view/layout/align');

export const viewModelNodeCollapse = createAction(
  'viewmodel/node/collapse',
  (id) => ({
    payload: { id },
  })
);

export const viewModelNodeExpand = createAction(
  'viewmodel/node/expand',
  (id) => ({
    payload: { id },
  })
);

export const viewModelItemSelectionChanged = createAction(
  'viewmodel/item/selection/changed',
  (id, type, isSelected) => ({
    payload: { id, type, isSelected },
  })
);

export const modelObjectDetach = createAction('model/object/detach', (id) => ({
  payload: { id },
}));

export const notificationAdd = createAction(
  'notification/add',
  (message, type, name) => ({
    payload: { id: uuidv4(), message, type, name },
  })
);

export const notificationRemove = createAction('notification/remove', (id) => ({
  payload: { id },
}));

export const loadStateStorage = createAction('state/load/storage', (name) => {
  const serializedData = localStorage.getItem(getStorageCombinedKey(name));
  return {
    payload: serializedData ? JSON.parse(serializedData).state : undefined,
  };
});

export const stateLoad = createAction('state/load', (state) => ({
  payload: { ...state },
}));

export const stateSave = createAsyncThunk('state/save', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  await save(
    JSON.stringify(state),
    `${state.project.name}-${state.project.version}.radical`
  );
});

export const setWindowDimensions = createAction('layout/windowDimensions/set');
export const layoutWidgetRestore = createAction('layout/widget/restore');

export const layoutModeChange = createAction('layout/mode/change', (mode) => ({
  payload: { mode },
}));

export const presentationSelect = createAction(
  'presentation/select',
  (presentationId) => ({ payload: { presentationId } })
);

export const presentationCreate = createAction(
  'presentation/create',
  (name) => ({ payload: { id: uuidv4(), name } })
);

export const presentationUpdateName = createAction(
  'presentation/updateName',
  (id, name) => ({ payload: { id, name } })
);

export const presentationRemove = createAction('presentation/remove', (id) => ({
  payload: { id },
}));

export const presentationSetGoTo = createAction(
  'presentation/step/goto',
  (presentationId, stepIndex) => ({
    payload: { presentationId, stepIndex },
  })
);

export const presentationStepAppend = createAction(
  'presentation/step/append',
  (presentationId) => ({
    payload: { presentationId, stepId: uuidv4() },
  })
);

export const presentationStepRemove = createAction(
  'presentation/step/remove',
  (presentationId, stepIndex) => ({
    payload: { presentationId, stepIndex },
  })
);
