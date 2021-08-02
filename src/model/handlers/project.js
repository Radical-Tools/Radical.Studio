import set from 'lodash/fp/set';

export const initialState = {
  name: '',
  version: '',
};
export const init = (state, payload) => set(['project'], payload, state);
export const editName = (state, payload) =>
  set(['project', 'name'], payload, state);
