import throttle from 'lodash/throttle';
import config from '../../common/appConfig';

export const getStorageCombinedKey = (name) =>
  `${config.operations.storageKey}:${name || ''}`;
const save = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(
      getStorageCombinedKey(state.project?.name),
      serializedState
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
