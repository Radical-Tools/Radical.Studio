import { configureStore } from '@reduxjs/toolkit';
import diff from 'redux-deep-diff';
import { rootReducer } from './rootReducer';
import subscribeToStoreChanges from '../model/handlers/localStorage';

const store = configureStore(
  {
    reducer: diff(rootReducer, { limit: 20 }),
    devTools: {
      name: 'Studio.Radical.Tools',
    },
  }
  // diff(rootReducer, { limit: 20 }),
  // composeWithDevTools({ name: 'Studio.Radical.Tools' })()
);

subscribeToStoreChanges(store);
export default store;
