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
    objects: {
      'Actor-1': {
        name: 'Architect',
        type: 'Actor',
        attributes: {
          description: 'main user of the system',
        },
      },
      'Actor-2': {
        name: 'Business Analyst',
        type: 'Actor',
        attributes: {
          description: 'user of the system',
        },
      },
      'System-1': {
        name: 'Radical Tools',
        type: 'System',
        attributes: {
          description: '',
        },
      },
      'Container-1': {
        name: 'Radical Studio',
        type: 'Container',
        attributes: {
          description: '',
          technology: 'js,React',
        },
      },
      'Container-2': {
        name: 'Radical Hub',
        type: 'Container',
        attributes: {
          description: '',
          technology: 'js,React',
        },
      },
      'Component-1': {
        name: 'Canvas',
        type: 'Component',
        attributes: {
          description: '',
          technology: 'ReactDiagrams',
        },
      },
      'Database-1': {
        name: 'Database',
        type: 'Component',
        attributes: {
          description: '',
          technology: 'Neo4J',
        },
      },
    },
    relations: {
      'Interacts-1': {
        name: 'interact',
        type: 'Interacts',
        source: 'Actor-1',
        target: 'Container-1',
        attributes: {
          technology: 'https,RestApi',
        },
      },
      'Interacts-2': {
        name: 'interact',
        type: 'Interacts',
        source: 'Container-2',
        target: 'Database-1',
        attributes: {
          technology: 'https,RestApi',
        },
      },
      'Includes-1': {
        name: 'includes',
        type: 'Includes',
        source: 'System-1',
        target: 'Container-1',
      },
      'Includes-2': {
        name: 'includes',
        type: 'Includes',
        source: 'System-1',
        target: 'Container-2',
      },
      'Includes-3': {
        name: 'includes',
        type: 'Includes',
        source: 'Container-1',
        target: 'Component-1',
      },
      'Includes-4': {
        name: 'includes',
        type: 'Includes',
        source: 'System-1',
        target: 'Database-1',
      },
    },
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
  flow(unset(['model', 'relations', payload.id]))(state);

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
