import { configureStore } from '@reduxjs/toolkit';
import historyReducer from './historyReducer';
import rootReducer from './rootReducer';
import subscribeToStoreChanges from '../controller/handlers/localStorage';

const store = configureStore({
  reducer: historyReducer(rootReducer),
  devTools: {
    name: 'Studio.Radical.Tools',
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

subscribeToStoreChanges(store, (state) => !state.layout.showHomeDialog);
export default store;
