import set from 'lodash/fp/set';

export const initialState = {
  project: {
    name: '',
    version: '',
    isLocked: false,
  },
};
export const init = (state, payload) => set(['project'], payload, state);
export const editName = (state, payload) =>
  set(['project', 'name'], payload, state);

export const lock = (state) => set(['project', 'isLocked'], true, state);
