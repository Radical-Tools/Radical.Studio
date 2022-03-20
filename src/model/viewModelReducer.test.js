import c4Metamodel from '../data/metamodels/c4/c4Metamodel';
import {
  viewModelViewAdd,
  viewModelViewRemove,
  viewModelViewUpdate,
  viewModelNodeAdd,
  viewModelLinkRemove,
  viewModelLinkAdd,
  viewModelNodeCollapse,
  viewModelNodeExpand,
} from '../controller/actions/actionCreators';

import rootReducer from './rootReducer';
import renderView from '../controller/handlers/common/viewmodel';
import initialState from './initialState';

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
        children: [],
      },
      'Actor-2': {
        name: 'Business Analyst',
        type: 'Actor',
        attributes: {
          description: 'user of the system',
        },
        children: [],
      },
      'System-1': {
        name: 'Radical Tools',
        type: 'System',
        attributes: {
          description: '',
        },
        children: [],
      },
      'Container-1': {
        name: 'Radical Studio',
        type: 'Container',
        attributes: {
          description: '',
          technology: 'js,React',
        },
        children: [],
      },
      'Container-2': {
        name: 'Radical Hub',
        type: 'Container',
        attributes: {
          description: '',
          technology: 'js,React',
        },
        children: [],
      },
      'Component-1': {
        name: 'Canvas',
        type: 'Component',
        attributes: {
          description: '',
          technology: 'ReactDiagrams',
        },
        children: [],
      },
      'Database-1': {
        name: 'Database',
        type: 'Component',
        attributes: {
          description: '',
          technology: 'Neo4J',
        },
        children: [],
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
      rootReducer(createInitialState(), viewModelViewAdd('new name', 'View-5'))
        .viewModel.views['View-5'].name
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
        viewModelViewUpdate('default', 'updated name')
      ).viewModel.views.default.name
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
    expect(
      state.project.viewModel.views.default.nodes['Actor-1']
    ).toBeDefined();
  });

  it('should render link', () => {
    let state = rootReducer(
      createInitialState(),
      viewModelNodeAdd(undefined, 'Actor-1')
    );
    state = rootReducer(state, viewModelNodeAdd(undefined, 'Container-1'));
    expect(
      renderView(state.project.viewModel.views.default, state.project.model)
        .links['Interacts-1']
    ).toBeDefined();

    state = rootReducer(state, viewModelLinkRemove('Interacts-1'));
    expect(
      renderView(state.project.viewModel.views.default, state.project.model)
        .links['Interacts-1']
    ).toBeUndefined();

    state = rootReducer(state, viewModelLinkAdd('Interacts-1'));
    expect(
      renderView(state.project.viewModel.views.default, state.project.model)
        .links['Interacts-1']
    ).toBeDefined();
  });
});

describe('expand & collapse node', () => {
  it('should add or remove the Container-1 node from the view', () => {
    let state = rootReducer(
      createInitialState(),
      viewModelNodeAdd('default', 'System-1')
    );

    state = rootReducer(state, viewModelNodeAdd('default', 'Container-1'));

    state = rootReducer(state, viewModelNodeAdd('default', 'Actor-1'));

    state = rootReducer(state, viewModelNodeCollapse('System-1'));

    expect(
      state.project.viewModel.views.default.nodes['Container-1']
    ).toBeDefined();

    state = rootReducer(state, viewModelNodeExpand('System-1'));

    expect(
      state.project.viewModel.views.default.nodes['Container-1']
    ).toBeDefined();
  });
});
