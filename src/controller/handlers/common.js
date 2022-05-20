import set from 'lodash/fp/set';
import merge from 'lodash/fp/merge';
import has from 'lodash/fp/has';
import transform from 'lodash/fp/transform';
import { addObject, addRelation, updateObject, updateRelation } from './model';
import { addView, updateView } from './viewModel';
import { currentMetamodelSelector } from '../selectors';

export const initialState = {
  common: {
    sandbox: {},
  },
};

export const createItem = (state, payload) =>
  set(
    ['common', 'sandbox'],
    {
      data: currentMetamodelSelector(state).schemas[payload.type].data,
      ui: currentMetamodelSelector(state).schemas[payload.type].create.ui,
    },
    state
  );
export const upsertItem = (state, payload) => {
  let newState = {};
  switch (payload.type) {
    case 'Object':
      newState = has(payload.item.id, state.project.model.objects)
        ? updateObject(state, payload.item)
        : addObject(state, payload.item);
      break;
    case 'Relation':
      newState = has(payload.item.id, state.project.model.relations)
        ? updateRelation(state, payload.item)
        : addRelation(state, payload.item);
      break;
    case 'View':
      newState = has(payload.item.id, state.project.viewModel.views)
        ? updateView(state, payload.item)
        : addView(state, payload.item);
      break;
    default:
      return state;
  }

  return set(['common', 'sandbox'], {}, newState);
};
const transformWithoutCap = transform.convert({
  cap: false,
});

const getItem = (state, type, id) => {
  switch (type) {
    case 'object':
      return {
        id,
        name: state.project.model.objects[id].name,
        type: state.project.model.objects[id].type,
        attributes: state.project.model.objects[id].attributes,
      };
    case 'relation':
      return {
        id,
        name: state.project.model.relations[id].name,
        type: state.project.model.relations[id].type,
        source: state.project.model.relations[id].source,
        target: state.project.model.relations[id].target,
        attributes: state.project.model.relations[id].attributes,
      };
    case 'view':
      return {
        id,
        name: state.project.viewModel.views[id].name,
      };
    default:
  }

  return null;
};

export const editItem = (state, payload) => {
  /* eslint no-param-reassign: "error" */
  const convertToDefaults = transformWithoutCap(
    (result, value, key) => {
      (result[key] || (result[key] = {})).default = value;
    },
    {},
    getItem(state, payload.type, payload.id)
  );

  return set(
    ['common', 'sandbox'],
    {
      data: merge(currentMetamodelSelector(state).schemas[payload.type].data, {
        properties: convertToDefaults,
      }),
      ui: currentMetamodelSelector(state).schemas[payload.type].update.ui,
    },
    state
  );
};
