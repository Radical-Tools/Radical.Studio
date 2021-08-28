import * as model from '../handlers/model';
import * as common from '../handlers/common';
import * as layout from '../handlers/layout';
import * as theme from '../handlers/theme';
import * as viewModel from '../handlers/viewModel';
import * as notifications from '../handlers/notifications';
import * as project from '../handlers/project';
import loadState from '../handlers/state';
import * as actionTypes from './action-types';
import * as actions from './action-creators';
import * as presentations from '../handlers/presentation';

const handlers = {
  [actionTypes.THEME_CHANGE]: theme.changeTheme,
  [actionTypes.LAYOUT_GRID_SET]: layout.setGridLayout,
  [actionTypes.LAYOUT_WIDGET_MAXIMIZE]: layout.performMaximize,
  [actionTypes.LAYOUT_WIDGET_MINIMIZE]: layout.performMinimize,
  [actionTypes.LAYOUT_WIDGET_CLOSE]: layout.performClose,
  [actionTypes.LAYOUT_WIDGET_ADD]: layout.performAdd,
  [actionTypes.LAYOUT_DRAWER_TOGGLE]: layout.toggleDrawer,
  [actionTypes.MODEL_OBJECT_ADD]: (state, payload) =>
    viewModel.updateCurrentView(model.addObject(state, payload)),
  [actionTypes.MODEL_RELATION_ADD]: (state, payload) =>
    viewModel.updateCurrentView(model.addRelation(state, payload)),
  [actionTypes.MODEL_OBJECT_REMOVE]: (state, payload) =>
    viewModel.updateCurrentView(model.removeObject(state, payload)),
  [actionTypes.MODEL_RELATION_REMOVE]: (state, payload) =>
    viewModel.updateCurrentView(model.removeRelation(state, payload)),
  [actionTypes.MODEL_OBJECT_UPDATE]: (state, payload) =>
    viewModel.updateCurrentView(model.updateObject(state, payload)),
  [actionTypes.MODEL_ITEM_UPDATE_NAME]: (state, payload) =>
    viewModel.updateCurrentView(model.updateItemName(state, payload)),
  [actionTypes.MODEL_RELATION_UPDATE]: (state, payload) =>
    viewModel.updateCurrentView(model.updateRelation(state, payload)),
  [actionTypes.MODEL_ITEM_CREATE]: common.createItem,
  [actionTypes.MODEL_ITEM_EDIT]: (state, payload) =>
    payload.type === 'view'
      ? viewModel.updateCurrentView(
          viewModel.activateView(common.editItem(state, payload), payload)
        )
      : common.editItem(state, payload),
  [actionTypes.MODEL_ITEM_UPSERT]: (state, payload) =>
    viewModel.updateCurrentView(common.upsertItem(state, payload)),
  [actions.initProject.toString()]: (state, payload) =>
    project.init(
      model.selectMetamodel(layout.closeHomeDialog(state), payload.metamodel),
      payload
    ),
  [actionTypes.VIEWMODEL_VIEW_ADD]: viewModel.addView,
  [actionTypes.VIEWMODEL_VIEW_REMOVE]: viewModel.removeView,
  [actionTypes.VIEWMODEL_NODE_ADD]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.addNode(state, payload)),
  [actionTypes.VIEWMODEL_METAMODELOBJECT_ADD]: (state, payload) =>
    common.editItem(
      viewModel.updateCurrentView(
        viewModel.addNode(model.addObject(state, payload), payload)
      ),
      {
        id: payload.id,
        type: 'object',
      }
    ),
  [actionTypes.VIEWMODEL_LINK_REMOVE]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.removeLink(state, payload)),
  [actionTypes.VIEWMODEL_LINK_ADD]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.addLink(state, payload)),
  [actionTypes.VIEWMODEL_VIEW_ACTIVATE]: (state, payload) =>
    viewModel.updateCurrentView(
      presentations.updateStepView(
        viewModel.activateView(state, payload),
        payload
      )
    ),
  [actionTypes.VIEWMODEL_VIEW_UPDATE]: viewModel.updateView,
  [actionTypes.VIEWMODEL_NODE_UPDATE]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.updateNode(state, payload)),
  [actionTypes.VIEWMODEL_NODE_REMOVE]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.removeNode(state, payload)),
  [actionTypes.VIEWMODEL_VIEW_ALIGNMENT_UPDATE]: (state, payload) =>
    presentations.updateStepAlignment(
      viewModel.viewAlignmentUpdate(state, payload),
      payload
    ),
  [actionTypes.VIEWMODEL_VIEW_LAYOUT_ALIGN]: viewModel.alignLayout,
  [actionTypes.VIEWMODEL_NODE_COLLAPSE]: (state, payload) =>
    viewModel.alignChildren(
      viewModel.updateCurrentView(viewModel.collapseNode(state, payload)),
      payload,
      state.viewModel.views[state.viewModel.current].nodes[payload.id].dimension
    ),
  [actionTypes.VIEWMODEL_NODE_EXPAND]: (state, payload) =>
    viewModel.alignChildren(
      viewModel.updateCurrentView(viewModel.expandNode(state, payload)),
      payload,
      state.viewModel.views[state.viewModel.current].nodes[payload.id].dimension
    ),
  [actionTypes.VIEWMODEL_ITEM_SELECTION_CHANGED]: (state, payload) =>
    viewModel.updateCurrentView(
      common.editItem(viewModel.itemSelectionChanged(state, payload), payload)
    ),
  [actionTypes.MODEL_OBJECT_DETACH]: (state, payload) =>
    viewModel.updateCurrentView(model.objectDetach(state, payload)),
  [actionTypes.NOTIFICATION_ADD]: notifications.addNotification,
  [actionTypes.NOTIFICATION_REMOVE]: notifications.removeNotifcation,
  [actions.loadStateStorage.toString()]: loadState,
  [actionTypes.STATE_LOAD]: loadState,
  [actions.setWindowDimensions.toString()]: layout.setWindowDimensions,
  [actions.layoutWidgetRestore.toString()]: layout.performRestore,
  [actionTypes.LAYOUT_MODE_CHANGE]: layout.setMode,
  [actions.presentationSelect.toString()]: presentations.select,
  [actions.presentationCreate.toString()]: presentations.create,
  [actions.presentationUpdateName.toString()]: presentations.updateName,
  [actions.presentationRemove.toString()]: presentations.remove,
  [actions.presentationSetGoTo.toString()]: presentations.goToStep,
  [actions.presentationStepAppend.toString()]: presentations.appendStep,
  [actions.presentationStepRemove.toString()]: presentations.removeStep,
};

export const initialState = {
  ...layout.initialState,
  ...model.initialState,
  ...theme.initialState,
  ...viewModel.initialState,
  ...common.initialState,
  ...notifications.initialState,
  ...project.initialState,
  ...presentations.initialState,
};

export const rootReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    try {
      return handlers[action.type](state, action.payload);
    } catch (error) {
      return notifications.addNotification(
        state,
        actions.notificationAdd(error.message, 'error', error.name).payload
      );
    }
  }
  return state;
};
