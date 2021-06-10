
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore } from 'redux';
import { rootReducer } from './rootReducer';
import subscribeToStoreChanges from './operations/saveState';


const store = createStore(
  rootReducer,
  composeWithDevTools({ name: 'Studio.Radical.Tools' })()
);

subscribeToStoreChanges(store);
export default store;

