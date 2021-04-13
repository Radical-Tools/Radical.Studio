import c4Metamodel from '../data/c4Metamodel';
import {
  viewModelViewAdd,
  viewModelViewRemove,
  viewModelViewUpdate,
  viewModelNodeAdd,
  viewModelLinkRemove,
  viewModelLinkAdd,
} from './action-creators';

import { rootReducer, initialState } from './rootReducer';
import renderView from '../model/helpers/viewmodel';

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
  },
  metamodel: c4Metamodel,
});

describe('views management', () => {
  it('should add view', () => {
    expect(
      rootReducer(createInitialState(), viewModelViewAdd('new name')).viewModel
        .views['View-2'].name
    ).toEqual('new name');
  });

  it('should remove view', () => {
    expect(
      rootReducer(createInitialState(), viewModelViewRemove('View-1')).viewModel
        .views['View-1']
    ).toEqual(undefined);
  });

  it('should update view name', () => {
    expect(
      rootReducer(
        createInitialState(),
        viewModelViewUpdate('View-1', 'updated name')
      ).viewModel.views['View-1'].name
    ).toEqual('updated name');
  });
});

describe('viewmodel management', () => {
  it('should add node', () => {
    const state = rootReducer(
      createInitialState(),
      viewModelNodeAdd(
        undefined,
        'Actor-1',
        { x: 0, y: 0 },
        { width: 150, height: 150 }
      )
    );
    expect(state.viewModel.views.default.nodes['Actor-1']).toBeDefined();
  });

  it('should render link', () => {
    let state = rootReducer(
      createInitialState(),
      viewModelNodeAdd(undefined, 'Actor-1', { x: 0, y: 0 })
    );
    state = rootReducer(
      state,
      viewModelNodeAdd(undefined, 'Container-1', { x: 0, y: 0 })
    );
    expect(
      renderView(state.viewModel.views.default, state.model).links[
        'Interacts-1'
      ]
    ).toBeDefined();

    state = rootReducer(state, viewModelLinkRemove('Interacts-1'));
    expect(
      renderView(state.viewModel.views.default, state.model).links[
        'Interacts-1'
      ]
    ).toBeUndefined();

    state = rootReducer(state, viewModelLinkAdd('Interacts-1'));
    expect(
      renderView(state.viewModel.views.default, state.model).links[
        'Interacts-1'
      ]
    ).toBeDefined();
  });
});
