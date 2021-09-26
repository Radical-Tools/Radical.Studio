import { configureStore } from '@reduxjs/toolkit';
import historyReducer from './historyReducer';
import rootReducer from './rootReducer';
import subscribeToStoreChanges from '../controller/handlers/localStorage';

/* eslint-disable no-console */
const store = configureStore({
  reducer: historyReducer(rootReducer, {
    limit: 20,
    prefilter: (path, key) =>
      (path.length === 0 && ['model', 'viewModel'].indexOf(key) === -1) ||
      key === 'current' ||
      key === 'alignment',
    skipAction: (action) => action.type === 'state/load/storage' || action.type === 'history/undo' || action.type === 'history.redo',
  }),
  devTools: {
    name: 'Studio.Radical.Tools',
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        ignoredPaths: ['history2'],
      },
    }),
});

subscribeToStoreChanges(store, (state) => !state.layout.showHomeDialog);
export default store;
