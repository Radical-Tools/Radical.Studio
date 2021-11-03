import isEmpty from 'lodash/fp/isEmpty';
import inRange from 'lodash/fp/inRange';
import pick from 'lodash/fp/pick';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';

cytoscape.use(fcose);

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

const align = (nodes, viewModel) => {
  const graph = {
    nodes: [],
    edges: [],
    fixedNodeConstraint: [],
  };

  function addNodes() {
    Object.entries(viewModel.nodes).forEach(([id, node]) => {
      graph.nodes.push({
        data: {
          id,
          parent: node.parentNode,
        },
        position: {
          x: node.position.x,
          y: node.position.y,
        },
        style: {
          width: node.dimension.width,
          height: node.dimension.height,
          padding: node.childrenNodes.length > 0 ? 0 : 30,
        },
      });
      if (nodes[id] === undefined && node.childrenNodes.length === 0) {
        graph.fixedNodeConstraint.push({
          nodeId: id,
          position: { x: node.position.x, y: node.position.y },
        });
      }
    });
  }

  function addLinks() {
    Object.entries(viewModel.links).forEach(([id, link]) => {
      graph.edges.push({
        data: {
          id,
          source: link.source,
          target: link.target,
        },
      });
    });
  }

  function execute() {
    const cy = cytoscape({
      container: null,
      elements: [...graph.nodes, ...graph.edges],
      headless: true,
      styleEnabled: true,
    });

    cy.layout({
      name: 'fcose',
      quality: 'proof',
      randomize: true,
      edgeElasticity: 0,
      nodeRepulsion: 400,
      nestingFactor: 0.1,
      packComponents: true,
      uniformNodeDimensions: true,
      samplingType: true,
      tile: true,
      idealEdgeLength: 50,
      gravity: 0.25,
      fixedNodeConstraint: graph.fixedNodeConstraint,
    }).run();

    return cy;
  }
  /* eslint-disable no-param-reassign */
  function update(cy) {
    cy.nodes().forEach((node) => {
      viewModel.nodes[node.id()].position.x = node.position().x;
      viewModel.nodes[node.id()].position.y = node.position().y;
      viewModel.nodes[node.id()].dimension.width = node.width();
      viewModel.nodes[node.id()].dimension.height = node.height();
    });
  }

  addNodes();
  addLinks();
  const cy = execute();
  update(cy);
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

const adjust = (viewModel, toleration = 100) => {
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
          adjustDistance(sourceNodeId, targetNodeId, 70, scores, viewModel);
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

  align(viewModel.nodes, viewModel);
  adjust(viewModel);
};

export const alignNested = (viewModel, nodeId) => {
  if (viewModel.nodes[nodeId].childrenNodes.length === 0) return;

  const selectedNodes = pick(
    [...viewModel.nodes[nodeId].childrenNodes, nodeId],
    viewModel.nodes
  );

  align(selectedNodes, viewModel);
};

export default adjust;
