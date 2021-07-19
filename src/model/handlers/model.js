import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import unset from 'lodash/fp/unset';
import omitBy from 'lodash/fp/omitBy';
import filter from 'lodash/fp/filter';
import update from 'lodash/fp/update';
import has from 'lodash/fp/has';
import identity from 'lodash/fp/identity';
import { v4 as uuidv4 } from 'uuid';

import {
  findRelations,
  findValidRelationClass,
  validateObject,
  validateObjectAttributes,
  validateRelation,
  validateRelationAttributes,
} from '../helpers/model';
import metamodels from '../../data/metamodels';
import { createError } from './notifications';

export const initialState = {
  model: {
    objects: {},
    relations: {},
  },
  metamodel: undefined,
};

export const addObject = (state, payload) => {
  const id = payload.id ? payload.id : uuidv4();

  const object = {
    name: payload.name ? payload.name : `New ${payload.type}`,
    type: payload.type,
    attributes: payload.attributes ? { ...payload.attributes } : {},
    children: [],
  };

  if (has(id, state.model.objects)) {
    throw createError('object already exist', 'Add Object Error');
  }

  try {
    validateObject(state.metamodel, state.model, object);
    return set(['model', 'objects', id], object, state);
  } catch (error) {
    throw createError(error.message, 'Add Object Error');
  }
};

export const updateItemName = (state, payload) =>
  update(
    ['model', payload.type === 'object' ? 'objects' : 'relations', payload.id],
    (object) => ({
      ...object,
      name: payload.name ? payload.name : object.name,
    }),
    state
  );
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
    throw createError(error.message, 'Update Object Error');
  }
};

/* eslint-disable no-param-reassign */
export const removeObject = (state, payload) => {
  if (!has(payload.id, state.model.objects)) {
    return state;
  }

  const { parent, children } = state.model.objects[payload.id];

  const newState = flow(
    unset(['model', 'objects', payload.id]),
    parent
      ? set(
          ['model', 'objects', parent, 'children'],
          filter(
            (child) => child !== payload.id,
            state.model.objects[parent].children
          )
        )
      : identity,
    set(
      ['model', 'relations'],
      omitBy(
        (value) => value.source === payload.id || value.target === payload.id,
        state.model.relations
      )
    )
  )(state);

  children.forEach((child) => {
    newState.model.objects[child] = {
      ...newState.model.objects[child],
      parent: undefined,
    };
  });

  return newState;
};

export const addRelation = (state, payload) => {
  try {
    const type = payload.type
      ? payload.type
      : findValidRelationClass(
          state.metamodel,
          state.model.objects[payload.source].type,
          state.model.objects[payload.target].type
        )[0].id;

    const relationId = payload.id ? payload.id : uuidv4();

    const relation = has(relationId, state.model.relations)
      ? {
          ...state.model.relations[relationId],
          target: payload.target,
        }
      : {
          name: payload.name ? payload.name : type,
          type,
          attributes: payload.attributes ? { ...payload.attributes } : {},
          source: payload.source,
          target: payload.target,
        };

    validateRelation(
      state.metamodel,
      has(relationId, state.model.relations)
        ? unset(['relations', relationId], state.model)
        : state.model,
      relation
    );
    return flow(
      set(['model', 'relations', relationId], relation),
      relation.type === 'Includes'
        ? flow(
            update(['model', 'objects', relation.source], (object) =>
              set('children', [...object.children, relation.target], object)
            ),
            set(
              ['model', 'objects', relation.target, 'parent'],
              relation.source
            )
          )
        : identity
    )(state);
  } catch (error) {
    throw createError(error.message, 'Add Relation Error');
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
    throw createError(error.message, 'Update Relation Error');
  }
};

export const removeRelation = (state, payload) => {
  const relation = state.model.relations[payload.id];
  return flow(
    unset(['model', 'relations', payload.id]),
    relation && relation.type === 'Includes'
      ? flow(
          unset(['model', 'objects', relation.target, 'parent']),
          update(
            ['model', 'objects', relation.source, 'children'],
            (children) => children.filter((item) => item !== relation.target)
          )
        )
      : identity
  )(state);
};
export const selectMetamodel = (state, payload) =>
  set(
    ['metamodel'],
    metamodels.find((metamodel) => metamodel.id === payload),
    state
  );

export const objectDetach = (state, payload) => {
  const { parent } = state.model.objects[payload.id];
  const relations = findRelations(
    state.model,
    [parent],
    ['Includes'],
    [payload.id]
  );
  if (relations.length === 1) {
    return removeRelation(state, { id: relations[0].id });
  }

  return state;
};
