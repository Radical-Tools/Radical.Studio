import c4Metamodel from '../data/c4Metamodel';
import {
  modelObjectAdd,
  modelObjectRemove,
  modelRelationAdd,
  modelRelationRemove,
  modelObjectUpdate,
  modelRelationUpdate,
  modelMetamodelSelect,
  modelItemUpdateName,
} from './action-creators';

import { rootReducer, initialState } from './rootReducer';

const createInitialState = () => ({
  ...initialState,
  model: {
    objects: {
      'Actor-1': {
        name: 'Architect',
        type: 'Actor',
        attributes: {
          description: 'main user of the system',
        },
        linked: {
          'Container-1': 'Interacts-1',
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
        children: ['Container-1', 'Container-2', 'Database-1'],
      },
      'Container-1': {
        name: 'Radical Studio',
        type: 'Container',
        attributes: {
          description: '',
          technology: 'js,React',
        },
        parent: 'System-1',
        children: ['Component-1'],
      },
      'Container-2': {
        name: 'Radical Hub',
        type: 'Container',
        parent: 'System-1',
        attributes: {
          description: '',
          technology: 'js,React',
        },
        linked: {
          'Database-1': 'Interacts-2',
        },
      },
      'Component-1': {
        name: 'Canvas',
        type: 'Component',
        parent: 'Container-1',
        attributes: {
          description: '',
          technology: 'ReactDiagrams',
        },
      },
      'Database-1': {
        name: 'Database',
        type: 'Component',
        parent: 'System-1',
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
  },
  metamodel: c4Metamodel,
});

describe('add relation', () => {
  it('should add the relation to the state', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Interacts-3',
          'Interacts',
          undefined,
          { technology: 'RestApi' },
          'Actor-1',
          'Component-1'
        )
      ).model.relations['Interacts-3']
    ).toEqual({
      name: 'Interacts',
      type: 'Interacts',
      source: 'Actor-1',
      target: 'Component-1',
      attributes: {
        technology: 'RestApi',
      },
    });
  });

  it('should ignore when the attribute invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Interacts-3',
          'Interacts',
          undefined,
          { incorrectAttributeName: 'RestApi' },
          'Actor-1',
          'Component-1'
        )
      ).model.relations['Interacts-3']
    ).toBeUndefined();
  });

  it('should log error when the attribute invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Interacts-3',
          'Interacts',
          undefined,
          { incorrectAttributeName: 'RestApi' },
          'Actor-1',
          'Component-1'
        )
      ).errors[0].name
    ).toEqual('Add Relation Error');
  });

  it('should ignore when the source invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Interacts-3',
          'Interacts',
          undefined,
          { technology: 'RestApi' },
          'IncorrectSourceId',
          'Component-1'
        )
      ).model.relations['Interacts-3']
    ).toBeUndefined();
  });

  it('should log error when the source invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Interacts-3',
          'Interacts',
          undefined,
          { technology: 'RestApi' },
          'IncorrectSourceId',
          'Component-1'
        )
      ).errors[0].name
    ).toEqual('Add Relation Error');
  });

  it('should ignore when the target invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Interacts-3',
          'Interacts',
          undefined,
          { technology: 'RestApi' },
          'Actor-1',
          'IncorrectTargetId'
        )
      ).model.relations['Interacts-3']
    ).toBeUndefined();
  });

  it('should log error when the target invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Interacts-3',
          'Interacts',
          undefined,
          { technology: 'RestApi' },
          'Actor-1',
          'IncorrectTargetId'
        )
      ).errors[0].name
    ).toEqual('Add Relation Error');
  });

  it('should ignore when the type invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Interacts-3',
          'IncorrectType',
          undefined,
          { technology: 'RestApi' },
          'Actor-1',
          'Component-1'
        )
      ).model.relations['Interacts-3']
    ).toBeUndefined();
  });

  it('should log error when type invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Interacts-3',
          'IncorrectType',
          undefined,
          { technology: 'RestApi' },
          'Actor-1',
          'Component-1'
        )
      ).errors[0].name
    ).toEqual('Add Relation Error');
  });

  it('should ignore when source class invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Interacts-3',
          'Includes',
          undefined,
          undefined,
          'Actor-1',
          'Actor-2'
        )
      ).model.relations['Interacts-3']
    ).toBeUndefined();
  });

  it('should log error when source class invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Interacts-3',
          'Includes',
          undefined,
          undefined,
          'Actor-1',
          'Actor-2'
        )
      ).errors[0].name
    ).toEqual('Add Relation Error');
  });

  it('should ignore when cardinality invalid (1:n)', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Includes-5',
          'Includes',
          undefined,
          undefined,
          'System-1',
          'Container-2'
        )
      ).model.relations['Interacts-5']
    ).toBeUndefined();
  });

  it('should log error when cardinality invalid (1:n)', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationAdd(
          'Includes-5',
          'Includes',
          undefined,
          undefined,
          'System-1',
          'Container-2'
        )
      ).errors[0].name
    ).toEqual('Add Relation Error');
  });
});

describe('remove relation', () => {
  it('should remove the relation from the state', () => {
    expect(
      rootReducer(createInitialState(), modelRelationRemove('Interacts-1'))
        .model.relations['Interacts-1']
    ).toBeUndefined();
  });

  it('should ignore when relation id invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationRemove('IncorrectRelationId')
      )
    ).toEqual(createInitialState());
  });
});

describe('update relation', () => {
  it('should update the state', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationUpdate('Interacts-1', 'New Name')
      ).model.relations['Interacts-1'].name
    ).toEqual('New Name');
  });

  it('should update relation attribute', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationUpdate('Interacts-1', undefined, {
          technology: 'new technology',
        })
      ).model.relations['Interacts-1'].attributes.technology
    ).toEqual('new technology');
  });

  it('should ignore when the attribute invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelRelationUpdate('Interacts-1', undefined, {
          incorrectAttribute: 'new technology',
        })
      ).errors[0].name
    ).toEqual('Update Relation Error');
  });
});

describe('add object', () => {
  it('should add object to the state', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelObjectAdd('Actor-3', 'Actor', 'Another User')
      ).model.objects['Actor-3']
    ).toEqual({
      name: 'Another User',
      type: 'Actor',
      attributes: {},
      children: [],
    });
  });

  it('should ignore when type invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelObjectAdd('Actor-3', 'IncorrectObjectType', 'Another User')
      ).model.objects['Actor-3']
    ).toBeUndefined();
  });

  it('should log error when type invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelObjectAdd('Actor-3', 'IncorrectObjectType', 'Another User')
      ).errors[0].name
    ).toEqual('Add Object Error');
  });

  it('should ignore when the object already exist', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelObjectAdd('Actor-2', 'Actor', 'Another User')
      ).model.objects['Actor-2'].name
    ).toEqual('Business Analyst');
  });

  it('should log error when the object already exist', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelObjectAdd('Actor-2', 'Actor', 'Another User')
      ).errors[0].name
    ).toEqual('Add Object Error');
  });

  it('should ignore when the attribute invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelObjectAdd('Actor-3', 'Actor', 'Another User', {
          incorrectAttribute: 'incorrectValue',
        })
      ).model.objects['Actor-3']
    ).toBeUndefined();
  });

  it('should log error when the attribute invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelObjectAdd('Actor-3', 'Actor', 'Another User', {
          incorrectAttribute: 'incorrectValue',
        })
      ).errors[0].name
    ).toEqual('Add Object Error');
  });
});

describe('remove object', () => {
  it('should remove the object from the state', () => {
    expect(
      rootReducer(createInitialState(), modelObjectRemove('Actor-1')).model
        .objects['Actor-1']
    ).toBeUndefined();
  });

  it('should ignore when the object id invalid', () => {
    expect(
      rootReducer(createInitialState(), modelObjectRemove('Actor-3'))
    ).toEqual(createInitialState());
  });
});

describe('update object', () => {
  it('should update the state', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelObjectUpdate('Actor-2', 'New Name')
      ).model.objects['Actor-2'].name
    ).toEqual('New Name');
  });

  it('should update the attributes of object', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelObjectUpdate('Actor-2', undefined, {
          description: 'new description',
        })
      ).model.objects['Actor-2'].attributes.description
    ).toEqual('new description');
  });

  it('should ignore when the attribute invalid', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelObjectUpdate('Actor-2', undefined, {
          invalidAttribute: 'new description',
        })
      ).errors[0].name
    ).toEqual('Update Object Error');
  });
});

describe('update item name', () => {
  it('should update the state for object', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelItemUpdateName('Actor-2', 'object', 'New Name')
      ).model.objects['Actor-2'].name
    ).toEqual('New Name');
  });
  it('should update the state for relation', () => {
    expect(
      rootReducer(
        createInitialState(),
        modelItemUpdateName('Interacts-2', 'relation', 'New Name')
      ).model.relations['Interacts-2'].name
    ).toEqual('New Name');
  });
});

describe('select metamodel', () => {
  it('should update the state and hide home dialog', () => {
    const state = rootReducer(createInitialState(), modelMetamodelSelect('C4'));
    expect(state.metamodel.id).toEqual('C4');
    expect(state.layout.showHomeDialog).toEqual(false);
  });
});
