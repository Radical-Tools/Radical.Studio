import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import unset from 'lodash/fp/unset';
import omitBy from 'lodash/fp/omitBy';
import update from 'lodash/fp/update';
import has from 'lodash/fp/has';

import {
  validateObject,
  validateObjectAttributes,
  validateRelation,
  validateRelationAttributes,
} from '../helpers/model';
import metamodels from '../../data/metamodels';

const addError = (state, name, reason) =>
  set(['errors'], [...state.errors, { name, reason }], state);

export const initialState = {
  model: {
    objects: {},
    relations: {},
  },
  metamodel: undefined,
};

export const addObject = (state, payload) => {
  const objectId = payload.id
    ? payload.id
    : `${payload.type}-${Object.keys(state.model.objects).length + 1}`;

  const object = {
    name: payload.name ? payload.name : 'Default Name',
    type: payload.type,
    attributes: payload.attributes ? { ...payload.attributes } : {},
  };

  if (has(objectId, state.model.objects)) {
    return addError(state, 'Add Object Error', 'object already exist');
  }

  try {
    validateObject(state.metamodel, state.model, object);
    return set(
      ['model', 'objects', objectId],
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
      ['model', 'objects', payload.objectId],
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
    unset(['model', 'objects', payload.objectId]),
    set(
      ['model', 'relations'],
      omitBy(
        (value) =>
          value.source === payload.objectId ||
          value.target === payload.objectId,
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
      ['model', 'relations', payload.relationId],
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
  unset(['model', 'relations', payload.relationId], state);

export const selectMetamodel = (state, payload) =>
  set(
    ['metamodel'],
    metamodels.find((metamodel) => metamodel.id === payload),
    state
  );
