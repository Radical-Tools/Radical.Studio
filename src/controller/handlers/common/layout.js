import isEmpty from 'lodash/fp/isEmpty';
import inRange from 'lodash/fp/inRange';
import * as cola from 'webcola';
import pick from 'lodash/fp/pick';

function getBoundingNodesRect(nodes, margin) {
  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;

  nodes.forEach((node) => {
    if (x1 === 0 || node.position.x - node.dimension.width / 2 < x1)
      x1 = node.position.x - node.dimension.width / 2;
    if (y1 === 0 || node.position.y - node.dimension.height / 2 < y1)
      y1 = node.position.y - node.dimension.height / 2;
    if (x2 === 0 || node.position.x + node.dimension.width / 2 > x2)
      x2 = node.position.x + node.dimension.width / 2;
    if (y2 === 0 || node.position.y + node.dimension.height / 2 > y2)
      y2 = node.position.y + node.dimension.height / 2;
  });

  return {
    x: x1 + (x2 - x1) / 2,
    y: y1 + (y2 - y1) / 2,
    width: x2 - x1 + 2 * margin,
    height: y2 - y1 + 2 * margin,
  };
}

const calcDistance = (sourceNode, targetNode) => {
  let x1;
  let x2;
  let y1;
  let y2;
  let w;
  let h;

  if (
    sourceNode.position.x - sourceNode.dimension.width / 2 >
    targetNode.position.x - targetNode.dimension.width / 2
  ) {
    x1 = targetNode.position.x - targetNode.dimension.width / 2;
    w = targetNode.dimension.width;
    x2 = sourceNode.position.x - sourceNode.dimension.width / 2;
  } else {
    x1 = sourceNode.position.x - sourceNode.dimension.width / 2;
    w = sourceNode.dimension.width;
    x2 = targetNode.position.x - targetNode.dimension.width / 2;
  }

  if (sourceNode.position.y > targetNode.position.y) {
    y1 = targetNode.position.y - targetNode.dimension.height / 2;
    h = targetNode.dimension.height;
    y2 = sourceNode.position.y - sourceNode.dimension.height / 2;
  } else {
    y1 = sourceNode.position.y - sourceNode.dimension.height / 2;
    h = sourceNode.dimension.height;
    y2 = targetNode.position.y - targetNode.dimension.height / 2;
  }

  const a = Math.max(0, x2 - x1 - w);
  const b = Math.max(0, y2 - y1 - h);
  return Math.sqrt(a * a + b * b);
};

const isParent = (node, potentialNodeId, nodes) => {
  if (node.parent === potentialNodeId) {
    return true;
  }
  if (node.parentNode) {
    return isParent(nodes[node.parent], potentialNodeId, nodes);
  }
  return false;
};

const isChild = (node, potentialChildId, nodes) => {
  if (node.childrenNodes && node.childrenNodes.includes(potentialChildId)) {
    return true;
  }

  if (node.childrenNodes) {
    return (
      Object.values(node.childrenNodes).filter((child) =>
        isChild(nodes[child], potentialChildId, nodes)
      ).length > 0
    );
  }
  return false;
};

const updateDimensions = (viewModel, nodeIds) => {
  let nodes;
  if (nodeIds) nodes = nodeIds;
  else
    nodes = Object.keys(viewModel.nodes).filter(
      (nodeId) =>
        viewModel.nodes[nodeId].childrenNodes.length === 0 &&
        viewModel.nodes[nodeId].parentNode
    );

  nodes.forEach((nodeId) => {
    const node = viewModel.nodes[nodeId];
    const parentNode = viewModel.nodes[node.parentNode];
    const boundedRect = getBoundingNodesRect(
      parentNode.childrenNodes.map((id) => viewModel.nodes[id]),
      50
    );
    parentNode.dimension.width = boundedRect.width;
    parentNode.dimension.height = boundedRect.height;
    parentNode.position.x = boundedRect.x;
    parentNode.position.y = boundedRect.y;
    if (parentNode.parentNode) {
      updateDimensions(
        viewModel,
        viewModel.nodes[parentNode.parentNode].childrenNodes
      );
    }
  });
};

const align = (
  nodes,
  viewModel,
  size,
  offset = { x: 0, y: 0 },
  margin = { x: 100, y: 100 },
  padding = 0
) => {
  const graph = {
    nodes: [],
    links: [],
    groups: [],
    constraints: [],
  };

  function addNodes() {
    Object.entries(nodes)
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

    Object.entries(nodes)
      .filter(([, node]) => node.childrenNodes.length > 0)
      .forEach(([id, node]) => {
        graph.nodes.push({
          name: id,
          width: 1,
          height: 1,
          x: node.position.x,
          y: node.position.y,
        });
      });
  }

  function addLinks() {
    Object.entries(viewModel.links).forEach(([, link]) => {
      const sourceIndex = graph.nodes.findIndex(
        (node) => node.name === link.source
      );
      const targetIndex = graph.nodes.findIndex(
        (node) => node.name === link.target
      );
      if (sourceIndex !== -1 && targetIndex !== -1) {
        graph.links.push({
          source: sourceIndex,
          target: targetIndex,
        });
      }
    });
  }

  function addGroups() {
    Object.entries(nodes)
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

        group.leaves.push(graph.nodes.findIndex((item) => item.name === id));
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
  }

  function execute() {
    const layout = new cola.Layout()
      .nodes(graph.nodes)
      .links(graph.links)
      .groups(graph.groups)
      .constraints(graph.constraints)
      .linkDistance(250)
      .avoidOverlaps(true)
      .handleDisconnected(false)
      .size(size);

    layout.start(1000, 1000, 1000, 0, false, false);

    return layout;
  }
  /* eslint-disable no-param-reassign */
  function update(layout) {
    layout.nodes().forEach((node) => {
      viewModel.nodes[node.name].position.x = node.x + offset.x;
      viewModel.nodes[node.name].position.y = node.y + offset.y;
      viewModel.nodes[node.name].dimension.width = node.width - margin.x;
      viewModel.nodes[node.name].dimension.height = node.height - margin.y;
    });

    layout.groups().forEach((group) => {
      viewModel.nodes[group.name].position.x =
        group.bounds.x + group.bounds.width() / 2 + offset.x;
      viewModel.nodes[group.name].position.y =
        group.bounds.y + group.bounds.height() / 2 + offset.y;
      viewModel.nodes[group.name].dimension.width = group.bounds.width();
      viewModel.nodes[group.name].dimension.height = group.bounds.height();
    });
  }

  addNodes();
  addLinks();
  addGroups();
  const layout = execute();
  update(layout);
};

const moveNode = (node, vector, nodes) => {
  node.position = {
    x: node.position.x + vector.x,
    y: node.position.y + vector.y,
  };
  Object.values(node.childrenNodes).forEach((childId) => {
    moveNode(nodes[childId], vector, nodes);
  });
};

const alignAx = (
  targetId,
  sourceId,
  coordinateName,
  viewModel,
  toleration,
  scores
) => {
  const targetNode = viewModel.nodes[targetId];
  const sourceNode = viewModel.nodes[sourceId];
  if (
    inRange(
      targetNode.position[coordinateName] - toleration,
      targetNode.position[coordinateName] + toleration,
      sourceNode.position[coordinateName]
    )
  ) {
    if (scores[targetId] >= scores[sourceId]) {
      sourceNode.position[coordinateName] = targetNode.position[coordinateName];
    } else {
      targetNode.position[coordinateName] = sourceNode.position[coordinateName];
    }
  }
};

function adjustDistance(
  sourceNodeId,
  targetNodeId,
  minDistance,
  scores,
  viewModel
) {
  const sourceNode = viewModel.nodes[sourceNodeId];
  const targetNode = viewModel.nodes[targetNodeId];

  const distance = calcDistance(sourceNode, targetNode);
  if (distance < minDistance) {
    const distanceToMove = minDistance - distance;
    const angle = Math.atan2(
      targetNode.position.y - sourceNode.position.y,
      targetNode.position.x - sourceNode.position.x
    );

    if (scores[sourceNodeId] >= scores[targetNodeId]) {
      moveNode(
        targetNode,
        {
          x: Math.cos(angle) * distanceToMove,
          y: Math.sin(angle) * distanceToMove,
        },
        viewModel.nodes
      );
    } else {
      moveNode(
        sourceNode,
        {
          x: -Math.cos(angle) * distanceToMove,
          y: -Math.sin(angle) * distanceToMove,
        },
        viewModel.nodes
      );
    }
  }
}

const calculateScores = (viewModel) => {
  const scores = [];

  Object.entries(viewModel.nodes).forEach(([nodeId, node]) => {
    if (!scores[nodeId]) scores[nodeId] = 0;
    scores[nodeId] += 1;
    scores[nodeId] += node.childrenNodes.length * 10;
    scores[nodeId] += node.parentNode ? 100 : 0;
  });

  Object.values(viewModel.links).forEach((link) => {
    scores[link.source] += 1;
    scores[link.target] += 1;
  });

  return scores;
};

const alignAxes = (target, source, viewModel, toleration, scores) => {
  alignAx(target, source, 'x', viewModel, toleration, scores);
  alignAx(target, source, 'y', viewModel, toleration, scores);
};

const adjust = (viewModel, toleration = 50) => {
  try {
    if (isEmpty(viewModel.nodes)) {
      return;
    }

    const scores = calculateScores(viewModel);

    Object.values(viewModel.links).forEach((link) => {
      adjustDistance(link.source, link.target, 0, scores, viewModel);
      alignAxes(link.target, link.source, viewModel, toleration, scores);
    });

    Object.entries(viewModel.nodes).forEach(([sourceNodeId, sourceNode]) => {
      Object.entries(viewModel.nodes).forEach(([targetNodeId, targetNode]) => {
        if (
          sourceNodeId !== targetNodeId &&
          !isParent(sourceNode, targetNodeId, viewModel.nodes) &&
          !isParent(targetNode, sourceNodeId, viewModel.nodes) &&
          !isChild(sourceNode, targetNodeId, viewModel.nodes) &&
          !isChild(targetNode, sourceNodeId, viewModel.nodes)
        ) {
          adjustDistance(sourceNodeId, targetNodeId, 100, scores, viewModel);
        }
      });
    });

    updateDimensions(viewModel);
  } catch (error) {
    Error(`Cannot align layout`);
  }
};

export const autoAlign = (viewModel) => {
  if (isEmpty(viewModel.nodes)) {
    return;
  }

  align(viewModel.nodes, viewModel, [1024, 1024]);
  adjust(viewModel);

  adjust(viewModel);
};

export const alignNested = (viewModel, nodeId) => {
  if (viewModel.nodes[nodeId].childrenNodes.length === 0) return;

  const selectedNodes = pick(
    [...viewModel.nodes[nodeId].childrenNodes, nodeId],
    viewModel.nodes
  );

  align(selectedNodes, viewModel, [0, 0], viewModel.nodes[nodeId].position);
};

export default adjust;
