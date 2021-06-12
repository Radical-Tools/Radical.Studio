import { createStore } from 'redux';
import config from '../../config/app-config';
import subscribeToStoreChanges from './saveState';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

describe('saveState', () => {
  let store;

  beforeEach(() => {
    function todos(state = [], action) {
      switch (action.type) {
        case 'ADD_TODO':
          return state.concat([action.text]);
        default:
          return state;
      }
    }

    store = createStore(todos, ['Use Redux']);
  });

  it('should subscribe to Redux state changes', () => {
    const subscribeSpy = jest.spyOn(store, 'subscribe');
    subscribeToStoreChanges(store);
    expect(subscribeSpy).toBeCalledTimes(1);
  });

  it('should save state to localStorage once Redux state changed', () => {
    const { storageKey } = config.operations;
    subscribeToStoreChanges(store);
    store.dispatch({ type: 'ADD_TODO', text: 'Use Angular' });
    const parsedState = JSON.parse(localStorage.getItem(storageKey));
    expect(parsedState).toEqual(['Use Redux', 'Use Angular']);
  });
});
