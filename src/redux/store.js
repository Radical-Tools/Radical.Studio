import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore } from 'redux';
import diff from 'redux-deep-diff';
import { rootReducer } from './rootReducer';
import subscribeToStoreChanges from '../model/handlers/localStorage';

const store = createStore(
  diff(rootReducer, { limit: 20 }),
  composeWithDevTools({ name: 'Studio.Radical.Tools' })()
);

subscribeToStoreChanges(store);
export default store;
