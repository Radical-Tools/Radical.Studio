import * as model from '../model/handlers/model';
import * as common from '../model/handlers/common';
import * as layout from '../model/handlers/layout';
import * as theme from '../model/handlers/theme';
import * as viewModel from '../model/handlers/viewModel';
import * as errors from '../model/handlers/errors';
import * as actionTypes from './action-types';
import testData from '../data/testData';

const handlers = {
  [actionTypes.THEME_CHANGE]: theme.changeTheme,
  [actionTypes.LAYOUT_GRID_SET]: layout.setGridLayout,
  [actionTypes.LAYOUT_WIDGET_MAXIMIZE]: layout.performMaximize,
  [actionTypes.LAYOUT_WIDGET_MINIMIZE]: layout.performMinimize,
  [actionTypes.LAYOUT_WIDGET_CLOSE]: layout.performClose,
  [actionTypes.LAYOUT_WIDGET_ADD]: layout.performAdd,
  [actionTypes.LAYOUT_DRAWER_TOGGLE]: layout.toggleDrawer,
  [actionTypes.MODEL_OBJECT_ADD]: model.addObject,
  [actionTypes.MODEL_RELATION_ADD]: model.addRelation,
  [actionTypes.MODEL_OBJECT_REMOVE]: model.removeObject,
  [actionTypes.MODEL_RELATION_REMOVE]: model.removeRelation,
  [actionTypes.MODEL_OBJECT_UPDATE]: model.updateObject,
  [actionTypes.MODEL_RELATION_UPDATE]: model.updateRelation,
  [actionTypes.MODEL_ITEM_CREATE]: common.createItem,
  [actionTypes.MODEL_ITEM_EDIT]: common.editItem,
  [actionTypes.MODEL_ITEM_UPSERT]: common.upsertItem,
  [actionTypes.MODEL_METAMODEL_SELECT]: (state, payload) =>
    testData(model.selectMetamodel(layout.closeHomeDialog(state), payload)),
  [actionTypes.VIEWMODEL_VIEW_ADD]: viewModel.addView,
  [actionTypes.VIEWMODEL_VIEW_REMOVE]: viewModel.removeView,
  [actionTypes.VIEWMODEL_NODE_ADD]: viewModel.addNode,
  [actionTypes.VIEWMODEL_LINK_REMOVE]: viewModel.removeLink,
  [actionTypes.VIEWMODEL_LINK_ADD]: viewModel.addLink,
  [actionTypes.VIEWMODEL_VIEW_ACTIVATE]: viewModel.activateView,
  [actionTypes.VIEWMODEL_VIEW_UPDATE]: viewModel.updateView,
  [actionTypes.VIEWMODEL_NODE_UPDATE]: viewModel.updateNode,
  [actionTypes.VIEWMODEL_NODE_REMOVE]: viewModel.removeNode,
  [actionTypes.VIEWMODEL_VIEW_ALIGNMENT_UPDATE]: viewModel.viewAlignmentUpdate,
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
