import { configureStore } from '@reduxjs/toolkit';
import diff from 'redux-deep-diff';
import rootReducer from './rootReducer';
import subscribeToStoreChanges from '../controller/handlers/localStorage';

const store = configureStore({
  reducer: diff(rootReducer, { limit: 20 }),
  devTools: {
    name: 'Studio.Radical.Tools',
  },
});

subscribeToStoreChanges(store, (state) => !state.layout.showHomeDialog);
export default store;
