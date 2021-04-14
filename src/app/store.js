import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore } from 'redux';
import { rootReducer } from '../redux/rootReducer';

const store = createStore(
  rootReducer,
  composeWithDevTools({ name: 'Studio.Radical.Tools' })()
);
export default store;
