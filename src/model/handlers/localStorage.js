import throttle from 'lodash/throttle';
import config from '../../config/app-config';

const save = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    const { storageKey } = config.operations;
    localStorage.setItem(storageKey, serializedState);
  } catch (e) {
    throw new Error(`Cannot save state`);
  }
};

export const load = (state) => {
  const { storageKey } = config.operations;
  const serializedState = localStorage.getItem(storageKey);
  return serializedState ? JSON.parse(serializedState) : state;
};

/**
 * Subscribes to store and persists current state in localStorage
 * @param {Object} store ReduxStore instance
 */
const subscribeToStoreChanges = (store) => {
  const { throttleInterval } = config.operations.save;
  store.subscribe(throttle(() => save(store.getState()), throttleInterval));
};

export default subscribeToStoreChanges;
