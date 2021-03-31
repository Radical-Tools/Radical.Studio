import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import unset from 'lodash/fp/unset';
import omitBy from 'lodash/fp/omitBy';
import update from 'lodash/fp/update';
import has from 'lodash/fp/has';
import merge from 'lodash/fp/merge';
import transform from 'lodash/fp/transform';

import {
  validateObject,
  validateObjectAttributes,
  validateRelation,
  validateRelationAttributes,
} from '../helpers/model';
import metamodels from '../../data/metamodels';

const addError = (state, name, reason) =>
  set(['errors'], [...state.errors, { name, reason }], state);

const transformWithoutCap = transform.convert({
  cap: false,
});

export const initialState = {
  model: {
    objects: {},
    relations: {},
    sandbox: {},
  },
  metamodel: undefined,
};

export const createItem = (state, payload) =>
  set(
    ['model', 'sandbox'],
    {
      data: state.metamodel.schemas[payload.type].data,
      ui: state.metamodel.schemas[payload.type].create.ui,
    },
    state
  );

export const editItem = (state, payload) => {
  /* eslint no-param-reassign: "error" */

  const convertToDefaults = transformWithoutCap(
    (result, value, key) => {
      (result[key] || (result[key] = {})).default = value;
    },
    {},
    {
      id: payload.id,
      ...state.model[payload.type === 'object' ? 'objects' : 'relations'][
        payload.id
      ],
    }
  );

  return set(
    ['model', 'sandbox'],
    {
      data: merge(state.metamodel.schemas[payload.type].data, {
        properties: convertToDefaults,
      }),
      ui: state.metamodel.schemas[payload.type].update.ui,
    },
    state
  );
};

export const addObject = (state, payload) => {
  const id = payload.id
    ? payload.id
    : `${payload.type}-${Object.keys(state.model.objects).length + 1}`;

  const object = {
    name: payload.name ? payload.name : 'Default Name',
    type: payload.type,
    attributes: payload.attributes ? { ...payload.attributes } : {},
  };

  if (has(id, state.model.objects)) {
    return addError(state, 'Add Object Error', 'object already exist');
  }

  try {
    validateObject(state.metamodel, state.model, object);
    return set(
      ['model', 'objects', id],
      { name: object.name, type: object.type, attributes: object.attributes },
      state
    );
  } catch (error) {
    return addError(state, 'Add Object Error', error.message);
  }
};

export const updateObject = (state, payload) => {
  try {
    return update(
      ['model', 'objects', payload.id],
      (object) => ({
        ...object,
        name: payload.name ? payload.name : object.name,
        attributes: {
          ...(payload.attributes &&
          validateObjectAttributes(
            state.metamodel,
            object.type,
            payload.attributes
          )
            ? payload.attributes
            : object.attributes),
        },
      }),
      state
    );
  } catch (error) {
    return addError(state, 'Update Object Error', error.message);
  }
};

export const removeObject = (state, payload) =>
  flow(
    unset(['model', 'objects', payload.id]),
    set(
      ['model', 'relations'],
      omitBy(
        (value) => value.source === payload.id || value.target === payload.id,
        state.model.relations
      )
    )
  )(state);

export const addRelation = (state, payload) => {
  const relationId = payload.id
    ? payload.id
    : `${payload.type}-${Object.keys(state.model.relations).length + 1}`;
  const relation = {
    name: payload.name ? payload.name : 'Default Name',
    type: payload.type,
    attributes: payload.attributes ? { ...payload.attributes } : {},
    source: payload.source,
    target: payload.target,
  };

  try {
    validateRelation(state.metamodel, state.model, relation);
    return set(
      ['model', 'relations', relationId],
      {
        name: relation.name,
        type: relation.type,
        attributes: relation.attributes,
        source: relation.source,
        target: relation.target,
      },
      state
    );
  } catch (error) {
    return addError(state, 'Add Relation Error', error.message);
  }
};

export const updateRelation = (state, payload) => {
  try {
    return update(
      ['model', 'relations', payload.id],
      (relation) => ({
        ...relation,
        name: payload.name ? payload.name : relation.name,
        attributes: {
          ...(payload.attributes &&
          validateRelationAttributes(
            state.metamodel,
            relation.type,
            payload.attributes
          )
            ? payload.attributes
            : relation.attributes),
        },
      }),
      state
    );
  } catch (error) {
    return addError(state, 'Update Relation Error', error.message);
  }
};

export const removeRelation = (state, payload) =>
  unset(['model', 'relations', payload.id], state);

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
    default:
      return state;
  }

  return set(['model', 'sandbox'], {}, newState);
};

export const selectMetamodel = (state, payload) =>
  set(
    ['metamodel'],
    metamodels.find((metamodel) => metamodel.id === payload),
    state
  );
