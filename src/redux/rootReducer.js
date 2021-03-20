import * as model from '../model/handlers/model';
import * as layout from '../model/handlers/layout';
import * as theme from '../model/handlers/theme';
import * as actionTypes from './action-types';

const handlers = {
  [actionTypes.THEME_CHANGE]: theme.changeTheme,
  [actionTypes.LAYOUT_GRID_SET]: layout.setGridLayout,
  [actionTypes.LAYOUT_WIDGET_MAXIMIZE]: layout.performMaximize,
  [actionTypes.LAYOUT_WIDGET_MINIMIZE]: layout.performMinimize,
  [actionTypes.LAYOUT_WIDGET_CLOSE]: layout.performClose,
  [actionTypes.LAYOUT_WIDGET_ADD]: layout.performAdd,
  [actionTypes.MODEL_OBJECT_ADD]: model.addObject,
  [actionTypes.MODEL_RELATION_ADD]: model.addRelation,
  [actionTypes.MODEL_OBJECT_REMOVE]: model.removeObject,
  [actionTypes.MODEL_RELATION_REMOVE]: model.removeRelation,
  [actionTypes.MODEL_OBJECT_UPDATE]: model.updateObject,
  [actionTypes.MODEL_RELATION_UPDATE]: model.updateRelation,
};

export const initialState = {
  ...layout.initialState,
  ...model.initialState,
  ...theme.initialState,
};

export const rootReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action.payload);
  }
  return state;
};
