import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import rootReducer from '../redux/rootReducer';

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development' && composeWithDevTools()
);
export default store;
