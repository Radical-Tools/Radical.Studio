import set from 'lodash/fp/set';
import merge from 'lodash/fp/merge';
import transform from 'lodash/fp/transform';
import { addObject, addRelation, updateObject, updateRelation } from './model';
import { addView, updateView } from './viewModel';

export const initialState = {
  common: {
    sandbox: {},
  },
};

export const createItem = (state, payload) =>
  set(
    ['common', 'sandbox'],
    {
      data: state.metamodel.schemas[payload.type].data,
      ui: state.metamodel.schemas[payload.type].create.ui,
    },
    state
  );
export const upsertItem = (state, payload) => {
  let newState = {};
  switch (payload.type) {
    case 'Object':
      newState = payload.item.id
        ? updateObject(state, payload.item)
        : addObject(state, payload.item);
      break;
    case 'Relation':
      newState = payload.item.id
        ? updateRelation(state, payload.item)
        : addRelation(state, payload.item);
      break;
    case 'View':
      newState = payload.item.id
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
        name: state.model.objects[id].name,
        type: state.model.objects[id].type,
        attributes: state.model.objects[id].attributes,
      };
    case 'relation':
      return {
        id,
        name: state.model.relations[id].name,
        type: state.model.relations[id].type,
        source: state.model.relations[id].source,
        target: state.model.relations[id].target,
        attributes: state.model.relations[id].attributes,
      };
    case 'view':
      return {
        id,
        name: state.viewModel.views[id].name,
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
      data: merge(state.metamodel.schemas[payload.type].data, {
        properties: convertToDefaults,
      }),
      ui: state.metamodel.schemas[payload.type].update.ui,
    },
    state
  );
};
