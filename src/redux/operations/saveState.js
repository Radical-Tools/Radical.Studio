import throttle from 'lodash/throttle';
import config from '../../config/app-config';

const saveState = (state) => {
  try {
    const serlializedState = JSON.stringify(state);
    const { storageKey } = config.operations;
    localStorage.setItem(storageKey, serlializedState);
  } catch (e) {
    // TODO: pick up logger lib
    // eslint-disable-next-line
    console.error('Cannot save state!', e);
  }
};

/**
 * Subscribes to store and persists current state in localStorage
 * @param {Object} store ReduxStore instance
 */
const subscribeToStoreChanges = (store) => {
  const { throttleInterval } = config.operations.save;
  store.subscribe(
    throttle(() => saveState(store.getState()), throttleInterval)
  );
};

export default subscribeToStoreChanges;
