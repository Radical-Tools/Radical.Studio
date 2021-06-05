import * as model from '../model/handlers/model';
import * as common from '../model/handlers/common';
import * as layout from '../model/handlers/layout';
import * as theme from '../model/handlers/theme';
import * as viewModel from '../model/handlers/viewModel';
import * as errors from '../model/handlers/errors';
import * as actionTypes from './action-types';

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
  [actionTypes.MODEL_OBJECT_UPDATE_NAME]: (state, payload) =>
    viewModel.updateCurrentView(model.updateObjectName(state, payload)),
  [actionTypes.MODEL_RELATION_UPDATE]: (state, payload) =>
    viewModel.updateCurrentView(model.updateRelation(state, payload)),
  [actionTypes.MODEL_ITEM_CREATE]: common.createItem,
  [actionTypes.MODEL_ITEM_EDIT]: common.editItem,
  [actionTypes.MODEL_ITEM_UPSERT]: (state, payload) =>
    viewModel.updateCurrentView(common.upsertItem(state, payload)),
  [actionTypes.MODEL_METAMODEL_SELECT]: (state, payload) =>
    model.selectMetamodel(layout.closeHomeDialog(state), payload),
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
    viewModel.updateCurrentView(viewModel.activateView(state, payload)),
  [actionTypes.VIEWMODEL_VIEW_UPDATE]: viewModel.updateView,
  [actionTypes.VIEWMODEL_NODE_UPDATE]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.updateNode(state, payload)),
  [actionTypes.VIEWMODEL_NODE_REMOVE]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.removeNode(state, payload)),
  [actionTypes.VIEWMODEL_VIEW_ALIGNMENT_UPDATE]: viewModel.viewAlignmentUpdate,
  [actionTypes.VIEWMODEL_VIEW_LAYOUT_ALIGN]: viewModel.alignLayout,
  [actionTypes.VIEWMODEL_NODE_COLLAPSE]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.collapseNode(state, payload)),
  [actionTypes.VIEWMODEL_NODE_EXPAND]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.expandNode(state, payload)),
  [actionTypes.VIEWMODEL_ITEM_SELECTION_CHANGED]: (state, payload) =>
    viewModel.updateCurrentView(
      common.editItem(viewModel.itemSelectionChanged(state, payload), payload)
    ),
};

export const initialState = {
  ...layout.initialState,
  ...model.initialState,
  ...theme.initialState,
  ...viewModel.initialState,
  ...common.initialState,
  ...errors.initialState,
};

export const rootReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action.payload);
  }
  return state;
};
