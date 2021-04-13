import set from 'lodash/fp/set';
import unset from 'lodash/fp/unset';
import update from 'lodash/fp/update';
import has from 'lodash/fp/has';

export const initialState = {
  viewModel: {
    current: 'default',
    views: {
      default: {
        name: 'Default View',
        version: '0.1',
        tags: ['common'],
        nodes: {},
        removedLinks: {},
        hierarchy: {},
      },
    },
  },
};

export const addView = (state, payload) => {
  const id = `View-${Object.keys(state.viewModel.views).length + 1}`;
  return set(
    ['viewModel', 'views', id],
    {
      name: payload.name,
      version: '1.0',
      tags: payload.tags,
    },
    state
  );
};

export const removeView = (state, payload) =>
  unset(['viewModel', 'views', payload.id], state);

export const updateView = (state, payload) =>
  update(
    ['viewModel', 'views', payload.id],
    (view) => ({
      ...view,
      name: payload.name ? payload.name : view.name,
      tags: payload.tags ? payload.tags : payload.tags,
    }),
    state
  );

export const addNode = (state, payload) => {
  if (!has(payload.id, state.model.objects)) {
    return state;
  }

  const viewId = payload.viewId ? payload.viewId : state.viewModel.current;
  return set(
    ['viewModel', 'views', viewId, 'nodes', payload.id],
    {
      position: payload.position ? payload.position : { x: 0, y: 0 },
      dimension: payload.dimension,
    },
    state
  );
};

export const removeNode = (state, payload) => {
  const viewId = payload.viewId ? payload.viewId : state.viewModel.current;
  return unset(['viewModel', 'views', viewId, 'nodes', payload.id], state);
};

export const updateNode = (state, payload) => {
  const viewId = payload.viewId ? payload.viewId : state.viewModel.current;
  return update(
    ['viewModel', 'views', viewId, 'nodes', payload.id],
    (node) => ({
      ...node,
      position: payload.position ? payload.position : node.position,
      dimension: payload.dimension ? payload.dimension : node.dimension,
    }),
    state
  );
};

export const removeLink = (state, payload) => {
  const viewId = payload.viewId ? payload.viewId : state.viewModel.current;
  return set(
    ['viewModel', 'views', viewId, 'removedLinks', payload.id],
    {},
    state
  );
};

export const addLink = (state, payload) => {
  const viewId = payload.viewId ? payload.viewId : state.viewModel.current;
  return unset(
    ['viewModel', 'views', viewId, 'removedLinks', payload.id],
    state
  );
};
