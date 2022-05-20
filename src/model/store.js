import { configureStore } from '@reduxjs/toolkit';
import historyReducer from './historyReducer';
import rootReducer from './rootReducer';
import subscribeToStoreChanges from '../controller/handlers/localStorage';
import undoReducer from './undoReducer';
import * as actions from '../controller/actions/actionCreators';

const skipActions = [
  actions.loadStateStorage.toString(),
  actions.stateLoad.toString(),
  actions.undo.toString(),
  actions.redo.toString(),
  actions.layoutDrawerToggle.toString(),
  actions.layoutAdminDialogToggle.toString(),
  actions.layoutSet.toString(),
  actions.viewModelItemSelectionChanged.toString(),
  actions.setWindowDimensions.toString(),
];

const store = configureStore({
  reducer: window.isExtension
    ? rootReducer
    : undoReducer(historyReducer(rootReducer)),
  devTools: {
    name: 'Studio.Radical.Tools',
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    (storeValue) => (next) => (action) => {
      const result = next(action);

      if (skipActions.includes(action.type) === false) {
        if (window.vscode) {
          window.vscode.postMessage({
            type: 'change',
            json: storeValue.getState().project,
          });
        }
      }

      return result;
    },
  ],
});

if (!window.isExtension) {
  subscribeToStoreChanges(store, (state) => !state.layout.showHomeDialog);
}

export default store;
