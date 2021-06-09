import RadicalLinkModel from '../links/RadicalLinkModel';
import RadicalComposedNodeModel from '../nodes/RadicalComposedNodeModel';
import RadicalLabelModel from '../labels/RadicalLabelModel';
import { DEFAULT_SOURCE_PORT, DEFAULT_TARGET_PORT } from '../consts';

const addNode = (diagramModel, viewModelNode) => {
  const node = new RadicalComposedNodeModel({
    id: viewModelNode.id,
    radical_type: viewModelNode.type,
    name: viewModelNode.name,
    attributes: viewModelNode.attributes,
    isParent: viewModelNode.children.length > 0,
    possibleRelations: viewModelNode.possibleRelations,
  });

  node.setPosition({
    x: viewModelNode.position.x - viewModelNode.dimension.width / 2,
    y: viewModelNode.position.y - viewModelNode.dimension.height / 2,
  });
  node.setSize(viewModelNode.dimension.width, viewModelNode.dimension.height);
  node.setSelected(viewModelNode.isSelected);

  diagramModel.addNode(node);
  // todo: parent boundary processing by canvas widget temporarily disabled
  if (viewModelNode.parentNode) {
    const diagramModelParentNode = diagramModel.getNode(
      viewModelNode.parentNode
    );
    diagramModelParentNode.addNode(node);
    node.addParent(diagramModelParentNode);
  }
  return node;
};
export const addNodes = (
  diagramModel,
  viewModel,
  viewModelNode,
  diagramParentNode
) => {
  if (!viewModelNode) {
    Object.entries(viewModel.nodes)
      .filter(([, node]) => node.parentNode === undefined)
      .forEach(([id, node]) => {
        addNodes(diagramModel, viewModel, { id, ...node });
      });
  } else {
    const node = addNode(diagramModel, viewModelNode, diagramParentNode);
    Object.values(viewModelNode.childrenNodes).forEach((id) => {
      addNodes(diagramModel, viewModel, { id, ...viewModel.nodes[id] }, node);
    });
  }
};
export const addLinks = (diagramModel, viewmodel) => {
  Object.entries(viewmodel.links).forEach(([linkId, link]) => {
    const diagramLink = new RadicalLinkModel({
      id: linkId,
      radical_type: link.type,
      name: link.name,
      attributes: link.attributes,
    });
    diagramLink.addLabel(
      new RadicalLabelModel({
        label: link.name,
        label2: link.attributes.technology
          ? `[Technology: ${link.attributes.technology}]`
          : '',
        offsetY: 20,
        visible: true,
      })
    );
    const sourceNode = diagramModel.getNode(link.source);
    const targetNode = diagramModel.getNode(link.target);
    diagramLink.setSourcePort(sourceNode.getPort(DEFAULT_SOURCE_PORT));
    diagramLink.setTargetPort(targetNode.getPort(DEFAULT_TARGET_PORT));
    diagramLink
      .getFirstPoint()
      .setPosition(sourceNode.getPort(DEFAULT_SOURCE_PORT).getCenter());
    diagramLink
      .getLastPoint()
      .setPosition(targetNode.getPort(DEFAULT_TARGET_PORT).getCenter());

    diagramLink.setSelected(link.isSelected);
    diagramModel.addLink(diagramLink);
  });
};
