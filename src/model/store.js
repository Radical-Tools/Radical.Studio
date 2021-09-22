import { configureStore } from '@reduxjs/toolkit';
import diff from '../redux-deep-diff';
import rootReducer from './rootReducer';
import subscribeToStoreChanges from '../controller/handlers/localStorage';

/* eslint-disable no-console */
const store = configureStore({
  reducer: diff(rootReducer, {
    limit: 20,
    prefilter: (path, key) =>
      path.length === 0 && ['model', 'viewModel'].indexOf(key) === -1,
    skipAction: (action) => action.type === 'state/load/storage',
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
