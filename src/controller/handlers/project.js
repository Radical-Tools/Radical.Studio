import set from 'lodash/fp/set';
import * as presentations from './presentation';
import * as history from './history';
import * as model from './model';
import * as viewModel from './viewModel';

export const initialState = {
  project: {
    name: '',
    version: '',
    isLocked: false,
    ...model.initialState,
    ...viewModel.initialState,
    ...presentations.initialState,
    ...history.initialState,
  },
};
export const init = (state, payload) =>
  set(['project'], { ...state.project, ...payload }, state);
export const editName = (state, payload) =>
  set(['project', 'name'], payload.name, state);

export const lock = (state) => set(['project', 'isLocked'], true, state);
