import omitBy from 'lodash/fp/omitBy';
import merge from 'lodash/fp/merge';
import pick from 'lodash/fp/pick';
import keys from 'lodash/fp/keys';
import has from 'lodash/fp/has';
import { Polygon, Rectangle } from '@projectstorm/geometry';

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

export const getBoundingNodesRect = (nodes, margin) => {
  if (nodes && nodes.length > 0) {
    const boundingBox = Polygon.boundingBoxFromPoints(
      nodes
        .map((node) => [
          { x: node.position.x, y: node.position.y },
          {
            x: node.position.x + node.dimension.width,
            y: node.position.y + node.dimension.height,
          },
        ])
        .flat(1)
    );
    if (margin) {
      return new Rectangle(
        boundingBox.getTopLeft().x - margin.left,
        boundingBox.getTopLeft().y - margin.top,
        boundingBox.getWidth() + margin.left + margin.right,
        boundingBox.getHeight() + margin.top + margin.bottom
      );
    }
  }
  return new Rectangle(0, 0, 150, 110);
};

/* eslint-disable no-param-reassign */
export function updateBoundary(nodeId, model, viewModel) {
  if (findChildren(nodeId, model, viewModel).length > 0) {
    const boundingBox = getBoundingNodesRect(
      findChildren(nodeId, model, viewModel).map(
        (objectId) => viewModel.nodes[objectId]
      ),
      { left: 20, right: 20, top: 80, bottom: 30 }
    );

    viewModel.nodes[nodeId].position = boundingBox.getTopLeft();
    viewModel.nodes[nodeId].dimension = {
      width: boundingBox.getWidth(),
      height: boundingBox.getHeight(),
    };

    const parentNodeId = findParent(nodeId, model, viewModel);
    if (parentNodeId) {
      updateBoundary(parentNodeId, model, viewModel);
    }
  }
}

export const updateParentalStructure = (model, viewModel) => {
  Object.entries(viewModel.nodes).forEach(([nodeId, node]) => {
    node.parentNode = findParent(nodeId, model, viewModel);
    node.childrenNodes = findChildren(nodeId, model, viewModel);
    if (!node.position) {
      node.position = node.parentNode
        ? viewModel.nodes[node.parentNode].position
        : { x: 0, y: 0 };
    }
    node.dimension =
      node.childrenNodes.length === 0
        ? { width: 150, height: 110 }
        : node.dimension;
    node.childrenNodes.forEach((childrenId) => {
      if (!viewModel.nodes[childrenId].position) {
        viewModel.nodes[childrenId].position = node.position;
        viewModel.nodes[childrenId].dimension = { width: 150, height: 110 };
      }
    });
    updateBoundary(nodeId, model, viewModel);
  });
};

const renderView = (viewModel, model) => {
  updateParentalStructure(model, viewModel);

  const view = {
    nodes: omitBy(
      (value) => value.name === undefined,
      merge(viewModel.nodes, pick(keys(viewModel.nodes), model.objects))
    ),
    links: {},
  };

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
        view.links[relationId] = {
          ...model.relations[relationId],
          source: sourceId,
          target: targetId,
        };
      }
    });

  return view;
};

export default renderView;
