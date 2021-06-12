import { StorageType } from '../app/consts';

const config = {
  operations: {
    save: {
      throttleInterval: 1000, // limit saving frequency
      defaultStorage: StorageType.LOCAL_STORAGE,
    },
    storageKey: 'Radical.Studio.state',
  },
};

export default config;
