import set from 'lodash/fp/set';
import unset from 'lodash/fp/unset';
import update from 'lodash/fp/update';
import has from 'lodash/fp/has';
import flow from 'lodash/fp/flow';

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
        alignment: {
          offsetX: 0,
          offsetY: 0,
          zoom: 100,
        },
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
      nodes: {},
      removedLinks: {},
      alignment: {
        offsetX: 0,
        offsetY: 0,
        zoom: 100,
      },
    },
    state
  );
};

export const removeView = (state, payload) =>
  Object.keys(state.viewModel.views).length > 1
    ? flow(
        unset(['viewModel', 'views', payload.id]),
        set(
          ['viewModel', 'current'],
          Object.keys(state.viewModel.views).filter(
            (item) => item !== payload.id
          )[0]
        )
      )(state)
    : state;

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

export const activateView = (state, payload) =>
  set(['viewModel', 'current'], payload.id, state);

export const addNode = (state, payload) =>
  has(payload.id, state.model.objects)
    ? set(
        [
          'viewModel',
          'views',
          payload.viewId ? payload.viewId : state.viewModel.current,
          'nodes',
          payload.id,
        ],
        {},
        state
      )
    : state;

export const removeNode = (state, payload) =>
  unset(
    [
      'viewModel',
      'views',
      payload.viewId ? payload.viewId : state.viewModel.current,
      'nodes',
      payload.id,
    ],
    state
  );

/* eslint-disable no-param-reassign */
export const updateNode = (state, payload) => {
  const viewId = payload.viewId ? payload.viewId : state.viewModel.current;

  function updatePosition(node, displacement) {
    node.childrenNodes.forEach((child) => {
      const childNode = state.viewModel.views[viewId].nodes[child];
      childNode.position = {
        x: childNode.position.x + displacement.x,
        y: childNode.position.y + displacement.y,
      };
      updatePosition(childNode, displacement);
    });
  }

  if (has(['viewModel', 'views', viewId, 'nodes', payload.id], state)) {
    const node = state.viewModel.views[viewId].nodes[payload.id];

    const displacement = {
      x: payload.position.x - node.position.x,
      y: payload.position.y - node.position.y,
    };

    const newState = update(
      ['viewModel', 'views', viewId, 'nodes', payload.id],
      (item) => ({
        ...item,
        position: payload.position,
        dimension: payload.dimension ? payload.dimension : item.dimension,
      }),
      state
    );
    updatePosition(node, displacement);

    return newState;
  }

  return state;
};

export const removeLink = (state, payload) =>
  set(
    [
      'viewModel',
      'views',
      payload.viewId ? payload.viewId : state.viewModel.current,
      'removedLinks',
      payload.id,
    ],
    {},
    state
  );

export const addLink = (state, payload) =>
  unset(
    [
      'viewModel',
      'views',
      payload.viewId ? payload.viewId : state.viewModel.current,
      'removedLinks',
      payload.id,
    ],
    state
  );

export const viewAlignmentUpdate = (state, payload) =>
  set(
    [
      'viewModel',
      'views',
      payload.viewId ? payload.viewId : state.viewModel.current,
      'alignment',
    ],
    {
      offsetX: payload.offsetX,
      offsetY: payload.offsetY,
      zoom: payload.zoom,
    },
    state
  );
