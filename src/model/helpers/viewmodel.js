import has from 'lodash/fp/has';

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
  defaultDimension = { width: 150, height: 130 }
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
      node.dimension = defaultDimension;
    }
  });
};

const renderView = (viewModel) => viewModel;

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
          isSelected: viewModel.links[relationId]
            ? viewModel.links[relationId].isSelected
            : false,
          source: sourceId,
          target: targetId,
        };
      }
    });

  return links;
};

export const getNestedChildren = (nodeIds, nodes) => {
  const toRemove = [];
  nodeIds.forEach((nodeId) => {
    const childrenIds = nodes[nodeId].childrenNodes;
    if (childrenIds && childrenIds.length > 0) {
      toRemove.push(...childrenIds);
      toRemove.push(...getNestedChildren(childrenIds, nodes));
    }
  });

  return toRemove;
};

export default renderView;
