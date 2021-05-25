import has from 'lodash/fp/has';
import * as cola from 'webcola';

export const findChildren = (objectId, model, viewModel) => {
  const children = [];
  if (model.objects[objectId] && model.objects[objectId].children) {
    Object.values(model.objects[objectId].children).forEach((object) => {
      if (viewModel.nodes[object] && model.objects[object]) {
        children.push(object);
      } else {
        children.push(...findChildren(object, model, viewModel));
      }
    });
  }
  return children;
};

export const findParent = (objectId, model, viewModel) => {
  if (model.objects[objectId] && model.objects[objectId].parent) {
    return has(model.objects[objectId].parent, viewModel.nodes)
      ? model.objects[objectId].parent
      : findParent(model.objects[objectId].parent, model, viewModel);
  }

  return undefined;
};

/* eslint-disable no-param-reassign */
export const updateParentalStructure = (
  model,
  viewModel,
  defaultNodeDimensions = { width: 150, height: 110 }
) => {
  Object.entries(viewModel.nodes).forEach(([nodeId, node]) => {
    node.parentNode = findParent(nodeId, model, viewModel);
    node.childrenNodes = findChildren(nodeId, model, viewModel);
    if (!node.position) {
      node.position = node.parentNode
        ? {
            // todo: due to cola.js overlap algorithm issue (+1)
            x: viewModel.nodes[node.parentNode].position.x + 1,
            y: viewModel.nodes[node.parentNode].position.y,
          }
        : { x: 0, y: 0 };
    }
    if (node.childrenNodes.length === 0) {
      node.dimension = defaultNodeDimensions;
    }
  });
};

const renderView = (viewModel) => viewModel;

export const align = (
  viewModel,
  isAuto,
  margin = { x: 0, y: 40 },
  padding = 50
) => {
  const graph = {
    nodes: [],
    links: [],
    groups: [],
    constraints: [],
  };

  Object.entries(viewModel.nodes)
    .filter(([, node]) => node.childrenNodes.length === 0)
    .forEach(([id, node]) => {
      graph.nodes.push({
        name: id,
        width: node.dimension.width + margin.x,
        height: node.dimension.height + margin.y,
        x: node.position.x,
        y: node.position.y,
      });
    });
  Object.entries(viewModel.links).forEach(([, link]) => {
    const sourceNode = viewModel.nodes[link.source];
    const targetNode = viewModel.nodes[link.target];
    sourceNode.childrenNodes.forEach((child) => {
      graph.links.push({
        source: graph.nodes.findIndex((node) => node.name === child),
        target: graph.nodes.findIndex((node) => node.name === link.target),
      });
    });

    targetNode.childrenNodes.forEach((child) => {
      graph.links.push({
        source: graph.nodes.findIndex((node) => node.name === link.source),
        target: graph.nodes.findIndex((node) => node.name === child),
      });
    });

    if (
      targetNode.childrenNodes.length === 0 &&
      sourceNode.childrenNodes.length === 0
    ) {
      graph.links.push({
        source: graph.nodes.findIndex((node) => node.name === link.source),
        target: graph.nodes.findIndex((node) => node.name === link.target),
      });
    }
  });

  Object.entries(viewModel.nodes)
    .filter(([, node]) => node.childrenNodes.length > 0)
    .forEach(([id, node]) => {
      const group = {
        leaves: [],
        groups: [],
      };

      Object.values(node.childrenNodes).forEach((nodeId) => {
        const childId = graph.nodes.findIndex((item) => item.name === nodeId);
        if (childId !== -1) {
          group.leaves.push(childId);
        }
      });
      group.name = id;
      group.padding = padding;
      group.childrenNodes = { ...node.childrenNodes };
      graph.groups.push(group);
    });

  graph.groups.forEach((group) => {
    Object.values(group.childrenNodes).forEach((child) => {
      const itemId = graph.groups.findIndex((item) => item.name === child);
      if (itemId !== -1) {
        group.groups.push(itemId);
      }
    });
  });

  if (graph.nodes.length === 0) {
    return;
  }

  const layout = isAuto
    ? new cola.Layout()
        .flowLayout('x', 350)
        .linkDistance(2)
        .avoidOverlaps(true)
        .handleDisconnected(false)
        .size([1024, 1024])
        .nodes(graph.nodes)
        .links(graph.links)
        .groups(graph.groups)
        .constraints(graph.constraints)
        .jaccardLinkLengths(60, 0.7)
    : new cola.Layout()
        .avoidOverlaps(true)
        .handleDisconnected(true)
        .size([1024, 1024])
        .nodes(graph.nodes)
        .links(graph.links)
        .groups(graph.groups)
        .constraints(graph.constraints);

  if (isAuto) {
    layout.start(100, 20, 100, 40, false, true);
  } else {
    layout.start(0, 0, 0, 200, false, false);
  }

  layout.nodes().forEach((node) => {
    viewModel.nodes[node.name].position.x = node.x;
    viewModel.nodes[node.name].position.y = node.y;
    viewModel.nodes[node.name].dimension.width = node.width - margin.x;
    viewModel.nodes[node.name].dimension.height = node.height - margin.y;
  });

  layout.groups().forEach((group) => {
    viewModel.nodes[group.name].position.x =
      group.bounds.x + group.bounds.width() / 2;
    viewModel.nodes[group.name].position.y =
      group.bounds.y + group.bounds.height() / 2;
    viewModel.nodes[group.name].dimension.width = group.bounds.width();
    viewModel.nodes[group.name].dimension.height = group.bounds.height();
  });
};

export const updateLinks = (model, viewModel) => {
  const links = {};
  Object.entries(model.relations)
    .filter(([, relation]) => relation.type !== 'Includes')
    .forEach(([relationId, relation]) => {
      const sourceId = viewModel.nodes[relation.source]
        ? relation.source
        : findParent(relation.source, model, viewModel);
      const targetId = viewModel.nodes[relation.target]
        ? relation.target
        : findParent(relation.target, model, viewModel);

      if (
        !has(relationId, viewModel.removedLinks) &&
        sourceId &&
        targetId &&
        sourceId !== targetId &&
        sourceId !== findParent(targetId, model, viewModel) &&
        targetId !== findParent(sourceId, model, viewModel)
      ) {
        links[relationId] = {
          ...model.relations[relationId],
          source: sourceId,
          target: targetId,
        };
      }
    });

  return links;
};

export default renderView;
