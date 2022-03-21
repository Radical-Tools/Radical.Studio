import throttle from 'lodash/throttle';
import { getStorageCombinedKey } from '../localStorageController';
import config from '../../app/appConfig';

const save = (state) => {
  try {
    const serializedData = JSON.stringify({
      timestamp: new Date().getTime(),
      state: state.project,
    });
    localStorage.setItem(
      getStorageCombinedKey(state.project?.name),
      serializedData
    );
  } catch (e) {
    throw new Error(`Cannot save state`);
  }
};

/**
 * Subscribes to store and persists current state in localStorage
 * @param {Object} store ReduxStore instance
 */
const subscribeToStoreChanges = (store, selector) => {
  const { throttleInterval } = config.operations.save;
  store.subscribe(
    throttle(() => {
      if (selector === undefined || selector(store.getState())) {
        save(store.getState());
      }
    }, throttleInterval)
  );
};

export default subscribeToStoreChanges;
