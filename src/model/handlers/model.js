import c4Metamodel from '../../data/c4Metamodel';

function generateQuickGuid() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export const initialState = {
  model: {
    objects: {},
    relations: {},
  },
  metamodel: c4Metamodel,
};

const validateRelation = () => true;

const validateObject = (metamodel, model, object) => {
  if (!object.id || !object.name || !object.type) {
    return false;
  }

  return metamodel.classes.find((item) => item.id === object.type);
};

export const addObject = (state, payload) => {
  const objectId = payload.id ? payload.id : generateQuickGuid();
  const object = {
    id: objectId,
    name: payload.name ? payload.name : 'Default Name',
    type: payload.type,
    attributes: payload.attributes ? payload.attributes : {},
  };

  if (validateObject(state.metamodel, state.model, object)) {
    return {
      ...state,
      model: {
        ...state.model,
        objects: {
          ...state.objects,
          [objectId]: object,
        },
      },
    };
  }
  return state;
};

export const removeObject = (state, payload) => {
  const {
    [payload.objectId]: removedObject,
    ...newObjects
  } = state.model.objects;
  return {
    ...state,
    model: {
      ...state.model,
      objects: {
        ...newObjects,
      },
    },
  };
};

export const addRelation = (state, payload) => {
  const relationId = payload.id ? payload.id : generateQuickGuid();
  const relation = {
    id: relationId,
    name: payload.name ? payload.name : 'Default Name',
    type: payload.type,
    attributes: payload.attributes ? payload.attributes : {},
    source: payload.source,
    target: payload.target,
  };

  if (validateRelation(state.metamodel, state.model, relation)) {
    return {
      ...state,
      model: {
        ...state.model,
        relations: {
          ...state.relations,
          [relationId]: relation,
        },
      },
    };
  }
  return state;
};

export const removeRelation = (state, payload) => {
  const {
    [payload.relationId]: removedRelation,
    ...newRelations
  } = state.model.relations;
  return {
    ...state,
    model: {
      ...state.model,
      relations: {
        ...newRelations,
      },
    },
  };
};
