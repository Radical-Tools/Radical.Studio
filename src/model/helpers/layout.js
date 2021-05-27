import isEmpty from 'lodash/fp/isEmpty';
import * as cola from 'webcola';

function addNodes(viewModel, graph, margin) {
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
}

function addLinks(viewModel, graph) {
  Object.entries(viewModel.links).forEach(([, link]) => {
    const sourceNode = viewModel.nodes[link.source];
    const targetNode = viewModel.nodes[link.target];

    sourceNode.childrenNodes.forEach((child) => {
      const sourceIndex = graph.nodes.findIndex((node) => node.name === child);
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

    targetNode.childrenNodes.forEach((child) => {
      const sourceIndex = graph.nodes.findIndex(
        (node) => node.name === link.source
      );
      const targetIndex = graph.nodes.findIndex((node) => node.name === child);
      if (sourceIndex !== -1 && targetIndex !== -1) {
        graph.links.push({
          source: sourceIndex,
          target: targetIndex,
        });
      }
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
}

function addGroups(viewModel, graph, padding) {
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
}

function execute(isAuto, graph) {
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
  return layout;
}
/* eslint-disable no-param-reassign */
function update(layout, viewModel, margin) {
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
}

const align = (viewModel, isAuto, margin = { x: 0, y: 40 }, padding = 50) => {
  if (isEmpty(viewModel.nodes)) {
    return;
  }

  const graph = {
    nodes: [],
    links: [],
    groups: [],
    constraints: [],
  };

  addNodes(viewModel, graph, margin);
  addLinks(viewModel, graph);
  addGroups(viewModel, graph, padding);
  const layout = execute(isAuto, graph);
  update(layout, viewModel, margin);
};

export default align;
