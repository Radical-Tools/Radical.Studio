import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import unset from 'lodash/fp/unset';
import omitBy from 'lodash/fp/omitBy';
import update from 'lodash/fp/update';

import c4Metamodel from '../../data/c4Metamodel';

import { validateObject, validateRelation } from '../helpers/model';

export const initialState = {
  model: {
    objects: {},
    relations: {},
  },
  metamodel: c4Metamodel,
};

export const addObject = (state, payload) => {
  const objectId = payload.id
    ? payload.id
    : `${payload.type}-${Object.keys(state.model.objects).length + 1}`;
  const object = {
    id: objectId,
    name: payload.name ? payload.name : 'Default Name',
    type: payload.type,
    attributes: payload.attributes ? { ...payload.attributes } : {},
  };

  try {
    validateObject(state.metamodel, state.model, object);
    return set(['model', 'objects', objectId], object, state);
  } catch (error) {
    return state;
  }
};

export const updateObject = (state, payload) =>
  update(
    ['model', 'objects', payload.objectId],
    (object) => ({
      ...object,
      name: payload.name,
      attributes: payload.attributes
        ? { ...payload.attributes }
        : { ...object.attributes },
    }),
    state
  );

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
    id: relationId,
    name: payload.name ? payload.name : 'Default Name',
    type: payload.type,
    attributes: payload.attributes ? { ...payload.attributes } : {},
    source: payload.source,
    target: payload.target,
  };

  try {
    validateRelation(state.metamodel, state.model, relation);
    return set(['model', 'relations', relationId], relation, state);
  } catch (error) {
    return set(['errors'], { source: 'model', description: error }, state);
  }
};

export const updateRelation = (state, payload) =>
  update(
    ['model', 'relations', payload.relationId],
    (n) => ({
      ...n,
      name: payload.name ? payload.name : n.name,
      attributes: payload.attributes
        ? { ...payload.attributes }
        : { ...n.attributes },
    }),
    state
  );

export const removeRelation = (state, payload) =>
  unset(['model', 'relations', payload.relationId], state);
