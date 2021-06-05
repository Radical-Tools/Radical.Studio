import set from 'lodash/fp/set';
import unset from 'lodash/fp/unset';
import update from 'lodash/fp/update';
import has from 'lodash/fp/has';
import flow from 'lodash/fp/flow';
import omitBy from 'lodash/fp/omitBy';
import omit from 'lodash/fp/omit';
import merge from 'lodash/fp/merge';
import pick from 'lodash/fp/pick';
import keys from 'lodash/fp/keys';
import cloneDeep from 'lodash/fp/cloneDeep';
import {
  getNestedChildren,
  updateLinks,
  updateParentalStructure,
} from '../helpers/viewmodel';
import align from '../helpers/layout';
import { findValidRelations } from '../helpers/model';

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
        links: {},
        alignment: {
          offsetX: 0,
          offsetY: 0,
          zoom: 100,
        },
      },
    },
  },
};

/* eslint-disable no-param-reassign */
export const updatePossibleRelations = (state, nodeId, isSelected) => {
  const newState = cloneDeep(state);

  const selectedObject = nodeId ? newState.model.objects[nodeId] : undefined;
  const currentView = newState.viewModel.views[newState.viewModel.current];
  Object.entries(currentView.nodes).forEach(([id, node]) => {
    node.possibleRelations =
      isSelected && selectedObject && id !== nodeId
        ? {
            source: nodeId,
            types: findValidRelations(
              newState.metamodel,
              newState.model,
              nodeId,
              id
            ),
          }
        : undefined;
  });

  return newState;
};

/* eslint-disable no-param-reassign */
export const updateCurrentView = (state) => {
  const newState = update(
    ['viewModel', 'views', state.viewModel.current],
    (view) => ({
      ...view,
      nodes: omitBy(
        (node, id) => !has(id, state.model.objects),
        merge(view.nodes, pick(keys(view.nodes), state.model.objects))
      ),
      links: updateLinks(state.model, view),
    }),
    state
  );

  updateParentalStructure(
    newState.model,
    newState.viewModel.views[newState.viewModel.current]
  );

  align(newState.viewModel.views[newState.viewModel.current], false);

  return newState;
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
      links: {},
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

export const activateView = (state, payload) => {
  const newState = set(['viewModel', 'current'], payload.id, state);
  return updateCurrentView(newState);
};

export const addNode = (state, payload) =>
  has(payload.id, state.model.objects) &&
  !has(payload.id, [
    'viewModel',
    'views',
    payload.viewId ? payload.viewId : state.viewModel.current,
    'nodes',
  ])
    ? set(
        [
          'viewModel',
          'views',
          payload.viewId ? payload.viewId : state.viewModel.current,
          'nodes',
          payload.id,
        ],
        {
          dimension: {},
          position: payload.position ? payload.position : {},
          isSelected: false,
        },
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
      x: payload.position.x - node.position.x + node.dimension.width / 2,
      y: payload.position.y - node.position.y + node.dimension.height / 2,
    };

    const newState = update(
      ['viewModel', 'views', viewId, 'nodes', payload.id],
      (item) => ({
        ...item,
        position: {
          x: payload.position.x + item.dimension.width / 2,
          y: payload.position.y + item.dimension.height / 2,
        },
        dimension: payload.dimension ? payload.dimension : item.dimension,
      }),
      state
    );
    updatePosition(
      state.viewModel.views[viewId].nodes[payload.id],
      displacement
    );
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

export const alignLayout = (state) => {
  const newState = cloneDeep(state);
  align(newState.viewModel.views[newState.viewModel.current], true);
  return newState;
};

export const collapseNode = (state, payload) => {
  const { nodes } = state.viewModel.views[state.viewModel.current];
  const { children } = nodes[payload.id];
  return children.length > 0
    ? set(
        ['viewModel', 'views', state.viewModel.current, 'nodes'],
        omit(getNestedChildren([payload.id], nodes), nodes),
        state
      )
    : state;
};

export const itemSelectionChanged = (state, payload) => {
  if (payload.type === 'object') {
    const newState = updatePossibleRelations(
      state,
      payload.id,
      payload.isSelected
    );
    newState.viewModel.views[newState.viewModel.current].nodes[
      payload.id
    ].isSelected = payload.isSelected;
    return newState;
  }

  return state;
};

export const expandNode = (state, payload) => {
  const viewId = payload.viewId ? payload.viewId : state.viewModel.current;
  const object = state.model.objects[payload.id];
  const newNodes = {};
  object.children.forEach((objectId) => {
    newNodes[objectId] = {
      dimension: {},
      position: state.viewModel.views[viewId].nodes[payload.id].position,
      isSelected: false,
    };
  });

  return update(
    [
      'viewModel',
      'views',
      payload.viewId ? payload.viewId : state.viewModel.current,
      'nodes',
    ],
    (nodes) => ({
      ...nodes,
      ...newNodes,
    }),
    state
  );
};
