import set from 'lodash/fp/set';
import unset from 'lodash/fp/unset';
import update from 'lodash/fp/update';
import has from 'lodash/fp/has';
import flow from 'lodash/fp/flow';
import omitBy from 'lodash/fp/omitBy';
import omit from 'lodash/fp/omit';
import mergeWith from 'lodash/fp/mergeWith';
import pick from 'lodash/fp/pick';
import keys from 'lodash/fp/keys';
import cloneDeep from 'lodash/fp/cloneDeep';
import forOwn from 'lodash/fp/forOwn';

import {
  getNestedChildren,
  updateLinks,
  updateParentalStructure,
} from './common/viewmodel';
import adjust, { alignNested, autoAlign } from './common/layout';
import { findValidRelations } from './common/model';

export const initialState = {
  viewModel: {
    current: 'default',
    linkingMode: true,
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
export const updatePossibleRelations = (state) => {
  const currentView = state.viewModel.views[state.viewModel.current];

  if (!state.viewModel.linkingMode) {
    Object.values(currentView.nodes).forEach((node) => {
      node.possibleRelations = undefined;
    });
    return state;
  }

  const selectedNodes = Object.entries(currentView.nodes).filter(
    ([, node]) => node.isSelected
  );

  if (selectedNodes.length === 1) {
    const [nodeId] = selectedNodes[0];
    Object.entries(currentView.nodes).forEach(([id, node]) => {
      node.possibleRelations =
        id !== nodeId
          ? {
              source: nodeId,
              types: findValidRelations(
                state.metamodel,
                state.project.model,
                nodeId,
                id
              ),
            }
          : undefined;
    });
    return state;
  }

  const selectedLinks = Object.entries(currentView.links).filter(
    ([, link]) => link.isSelected
  );

  if (selectedLinks.length === 1) {
    const [linkId, link] = selectedLinks[0];
    Object.entries(currentView.nodes).forEach(([id, node]) => {
      node.possibleRelations =
        id !== link.source
          ? {
              source: link.source,
              types: findValidRelations(
                state.metamodel,
                id !== link.target
                  ? unset(['relations', linkId], state.project.model)
                  : state.project.model,
                link.source,
                id
              ).filter((type) => type === link.type),
              id: linkId,
            }
          : undefined;
    });

    return state;
  }

  Object.values(currentView.nodes).forEach((node) => {
    node.possibleRelations = undefined;
  });

  return state;
};

/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
export const updateCurrentView = (state) => {
  const newState = update(
    ['viewModel', 'views', state.viewModel.current],
    (view) => ({
      ...view,
      nodes: omitBy(
        (node, id) => !has(id, state.project.model.objects),
        mergeWith(
          (source, target) => ({ ...source, ...target }),
          view.nodes,
          pick(keys(view.nodes), state.project.model.objects)
        )
      ),
      links: updateLinks(state.project.model, view),
    }),
    state
  );

  updateParentalStructure(
    newState.project.model,
    newState.viewModel.views[newState.viewModel.current]
  );

  updatePossibleRelations(newState);
  adjust(newState.viewModel.views[newState.viewModel.current]);
  adjust(newState.viewModel.views[newState.viewModel.current]);

  return newState;
};
export const addView = (state, payload) => {
  return set(
    ['viewModel', 'views', payload.id],
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
      tags: payload.tags ? payload.tags : view.tags,
    }),
    state
  );

export const activateView = (state, payload) => {
  const newState = set(['viewModel', 'current'], payload.id, state);
  return updateCurrentView(newState);
};

export const addNode = (state, payload) =>
  has(payload.id, state.project.model.objects) &&
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

function updatePosition(state, viewId, node, displacement) {
  node.childrenNodes.forEach((child) => {
    const childNode = state.viewModel.views[viewId].nodes[child];
    state = update(
      ['viewModel', 'views', viewId, 'nodes', child],
      (item) => ({
        ...item,
        position: {
          x: childNode.position.x + displacement.x,
          y: childNode.position.y + displacement.y,
        },
      }),
      state
    );
    state = updatePosition(state, viewId, childNode, displacement);
  });
  return state;
}

export const updateNode = (state, payload) => {
  const viewId = payload.viewId ? payload.viewId : state.viewModel.current;

  if (has(['viewModel', 'views', viewId, 'nodes', payload.id], state)) {
    const node = state.viewModel.views[viewId].nodes[payload.id];

    const displacement = {
      x: payload.position.x - node.position.x + node.dimension.width / 2,
      y: payload.position.y - node.position.y + node.dimension.height / 2,
    };

    let newState = update(
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
    newState = updatePosition(
      newState,
      viewId,
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

export const viewAlignmentUpdate = (state, payload) => {
  return set(
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
};

export const alignLayout = (state) => {
  const newState = cloneDeep(state);
  autoAlign(newState.viewModel.views[newState.viewModel.current]);
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

export const unselectAll = (state) => {
  return set(
    ['viewModel', 'views', state.viewModel.current, 'nodes'],
    forOwn((object) => {
      object.isSelected = false;
    }, cloneDeep(state.viewModel.views[state.viewModel.current].nodes)),
    state
  );
};

export const itemSelectionChanged = (state, payload) => {
  if (payload.type === 'object') {
    return set(
      [
        'viewModel',
        'views',
        state.viewModel.current,
        'nodes',
        payload.id,
        'isSelected',
      ],
      payload.isSelected,
      state
    );
  }
  if (payload.type === 'relation') {
    return set(
      [
        'viewModel',
        'views',
        state.viewModel.current,
        'links',
        payload.id,
        'isSelected',
      ],
      payload.isSelected,
      state
    );
  }

  return state;
};

export const expandNode = (state, payload) => {
  const viewId = payload.viewId ? payload.viewId : state.viewModel.current;
  const object = state.project.model.objects[payload.id];
  const newNodes = {};
  object.children.forEach((objectId) => {
    newNodes[objectId] = {
      dimension: {},
      isSelected: false,
      childrenNodes: [],
    };
  });

  return update(
    ['viewModel', 'views', viewId, 'nodes'],
    (nodes) => ({
      ...nodes,
      ...newNodes,
    }),
    state
  );
};

export const adaptView = (state, centerNodeId, offset) => {
  const node =
    state.viewModel.views[state.viewModel.current].nodes[centerNodeId];
  Object.entries(state.viewModel.views[state.viewModel.current].nodes).forEach(
    ([nodeId, item]) => {
      if (nodeId !== centerNodeId && !node.children.includes(nodeId)) {
        const angle = Math.atan2(
          node.position.y - item.position.y,
          node.position.x - item.position.x
        );

        item.position = {
          x: item.position.x - (Math.cos(angle) * offset.x) / 2,
          y: item.position.y - (Math.sin(angle) * offset.y) / 2,
        };
      }
    }
  );
  return state;
};

export const setLinkingMode = (state, payload) =>
  set(['viewModel', 'linkingMode'], payload.status, state);

export const alignChildren = (state, payload, originDimension) => {
  const node = state.viewModel.views[state.viewModel.current].nodes[payload.id];
  alignNested(state.viewModel.views[state.viewModel.current], payload.id);
  adjust(state.viewModel.views[state.viewModel.current]);
  const targetDimension = node.dimension;
  const offset = {
    x: targetDimension.width - originDimension.width,
    y: targetDimension.height - originDimension.height,
  };
  adaptView(state, payload.id, offset);
  adjust(state.viewModel.views[state.viewModel.current]);
  return state;
};

export const fixBrokenView = (state) =>
  state.viewModel.views[state.viewModel.current] === undefined
    ? set(
        ['viewModel', 'current'],
        Object.keys(state.viewModel.views)[0],
        state
      )
    : state;
