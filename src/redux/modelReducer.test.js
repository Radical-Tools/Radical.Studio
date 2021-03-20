import {
  modelObjectAdd,
  modelObjectRemove,
  modelRelationAdd,
  modelRelationRemove,
  modelObjectUpdate,
} from './action-creators';

import { rootReducer, initialState } from './rootReducer';

const createC4TestObject = (id, type) => ({
  [id]: {
    id,
    name: id,
    type,
    attributes: {
      description: 'some description',
    },
  },
});

const modelObjectAddAction = (id, type) =>
  modelObjectAdd(id, type, id, { description: 'some description' });
const modelRelationAddAction = (id, type, source, target) =>
  modelRelationAdd(
    id,
    type,
    id,
    { description: 'some description' },
    source,
    target
  );
const createC4TestRelation = (id, type, source, target) => ({
  [id]: {
    id,
    name: id,
    type,
    source,
    target,
    attributes: {
      description: 'some description',
    },
  },
});

describe('relations management', () => {
  it('should remove the related relations when the source or target object is removed', () => {
    expect(
      rootReducer(
        {
          ...initialState,
          model: {
            objects: {
              ...createC4TestObject('Actor', 'Actor'),
              ...createC4TestObject('System', 'System'),
            },
            relations: {
              ...createC4TestRelation(
                'Interacts-1',
                'Interacts',
                'Actor',
                'System'
              ),
            },
          },
        },
        modelObjectRemove('Actor')
      ).model
    ).toEqual({
      objects: {
        ...createC4TestObject('System', 'System'),
      },
      relations: {},
    });
  });

  it('should ignore add relation if is invalid', () => {
    expect(
      rootReducer(
        {
          ...initialState,
          model: {
            ...initialState.model,
            objects: {
              ...createC4TestObject('Actor', 'Actor'),
              ...createC4TestObject('System', 'System'),
            },
          },
        },
        modelRelationAddAction('Relation-1', 'Interact2', 'Actor', 'System')
      ).model
    ).toEqual({
      objects: {
        ...createC4TestObject('Actor', 'Actor'),
        ...createC4TestObject('System', 'System'),
      },
      relations: {},
    });
  });

  it('should ignore add relation if type (1:n) is violated', () => {
    expect(
      rootReducer(
        {
          ...initialState,
          model: {
            objects: {
              ...createC4TestObject('Container-01', 'Container'),
              ...createC4TestObject('Container-02', 'Container'),
              ...createC4TestObject('System-01', 'System'),
              ...createC4TestObject('System-02', 'System'),
            },
            relations: {
              ...createC4TestRelation(
                'Relation-1',
                'Includes',
                'System-01',
                'Container-01'
              ),
            },
          },
        },
        modelRelationAddAction(
          'Relation-2',
          'Includes',
          'System-02',
          'Container-01'
        )
      ).model.relations
    ).toEqual({
      ...createC4TestRelation(
        'Relation-1',
        'Includes',
        'System-01',
        'Container-01'
      ),
    });
  });

  it('should remove the relation', () => {
    expect(
      rootReducer(
        {
          ...initialState,
          model: {
            objects: {
              ...createC4TestObject('Container-01', 'Container'),
              ...createC4TestObject('Container-02', 'Container'),
              ...createC4TestObject('System-01', 'System'),
              ...createC4TestObject('System-02', 'System'),
            },
            relations: {
              ...createC4TestRelation(
                'Relation-1',
                'Includes',
                'System-01',
                'Container-01'
              ),
            },
          },
        },
        modelRelationRemove('Relation-1')
      ).model.relations
    ).toEqual({});
  });

  it('should add relation if type (1:n) is non violated', () => {
    expect(
      rootReducer(
        {
          ...initialState,
          model: {
            objects: {
              ...createC4TestObject('Container-01', 'Container'),
              ...createC4TestObject('Container-02', 'Container'),
              ...createC4TestObject('System-01', 'System'),
              ...createC4TestObject('System-02', 'System'),
            },
            relations: {
              ...createC4TestRelation(
                'Relation-1',
                'Includes',
                'System-01',
                'Container-01'
              ),
            },
          },
        },
        modelRelationAddAction(
          'Relation-2',
          'Includes',
          'System-02',
          'Container-02'
        )
      ).model.relations
    ).toEqual({
      ...createC4TestRelation(
        'Relation-1',
        'Includes',
        'System-01',
        'Container-01'
      ),
      ...createC4TestRelation(
        'Relation-2',
        'Includes',
        'System-02',
        'Container-02'
      ),
    });
  });
});

describe('objects management', () => {
  it('should ignore remove request of nonexistent object', () => {
    expect(
      rootReducer(
        {
          ...initialState,
          model: {
            objects: {
              ...createC4TestObject('System', 'System'),
            },
          },
        },
        modelObjectRemove('Actor')
      ).model.objects
    ).toEqual({
      ...createC4TestObject('System', 'System'),
    });
  });

  it('should add object to model', () => {
    expect(
      rootReducer(initialState, modelObjectAddAction('Actor', 'Actor')).model
        .objects
    ).toEqual({
      ...createC4TestObject('Actor', 'Actor'),
    });
  });

  it('should ignore incorrect add object to model', () => {
    expect(
      rootReducer(initialState, modelObjectAddAction('Actor', 'Actor2')).model
        .objects
    ).toEqual({});
  });

  it('should use default name', () => {
    expect(
      rootReducer(initialState, modelObjectAdd('Actor', 'Actor')).model.objects
    ).toEqual({
      Actor: {
        id: 'Actor',
        name: 'Default Name',
        type: 'Actor',
        attributes: {},
      },
    });
  });

  it('should store the attributes if passed', () => {
    expect(
      rootReducer(
        initialState,
        modelObjectAdd(undefined, 'Actor', undefined, { technology: 'RestAPI' })
      ).model.objects
    ).toEqual({
      'Actor-1': {
        id: 'Actor-1',
        name: 'Default Name',
        type: 'Actor',
        attributes: {
          technology: 'RestAPI',
        },
      },
    });
  });

  it('should ignore add the object with incorrect type', () => {
    expect(
      rootReducer(initialState, modelObjectAddAction('Actor', 'Actor2')).model
        .objects
    ).toEqual({});
  });

  it('should remove object from model', () => {
    expect(
      rootReducer(
        {
          ...initialState,
          model: {
            ...initialState.model,
            objects: {
              ...createC4TestObject('Actor', 'Actor'),
              ...createC4TestObject('System', 'System'),
            },
          },
        },
        modelObjectRemove('Actor')
      ).model.objects
    ).toEqual({
      ...createC4TestObject('System', 'System'),
    });
  });

  it('should update the object', () => {
    expect(
      rootReducer(
        {
          ...initialState,
          model: {
            ...initialState.model,
            objects: {
              ...createC4TestObject('Actor', 'Actor'),
              ...createC4TestObject('System', 'System'),
            },
          },
        },
        modelObjectUpdate('Actor', 'New Name')
      ).model.objects.Actor.name
    ).toEqual('New Name');
  });

  it('should update the objects attributes', () => {
    expect(
      rootReducer(
        {
          ...initialState,
          model: {
            ...initialState.model,
            objects: {
              ...createC4TestObject('Actor', 'Actor'),
              ...createC4TestObject('System', 'System'),
            },
          },
        },
        modelObjectUpdate('Actor', undefined, { technology: 'test' })
      ).model.objects.Actor.attributes
    ).toEqual({ technology: 'test' });
  });
});
