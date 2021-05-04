import RadicalLinkModel from '../links/RadicalLinkModel';
import RadicalComposedNodeModel from '../nodes/RadicalComposedNodeModel';
import RadicalLabelModel from '../labels/RadicalLabelModel';

const addNode = (diagramModel, viewModelNode, diagramModelParentNode) => {
  const node = new RadicalComposedNodeModel({
    id: viewModelNode.id,
    radical_type: viewModelNode.type,
    name: viewModelNode.name,
    attributes: viewModelNode.attributes,
  });

  node.setPosition(viewModelNode.position);
  node.setSize(viewModelNode.dimension.width, viewModelNode.dimension.height);
  diagramModel.addNode(node);
  if (diagramModelParentNode) {
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
    diagramLink.setSourcePort(sourceNode.getPort('right1'));
    diagramLink.setTargetPort(targetNode.getPort('left1'));
    diagramLink
      .getFirstPoint()
      .setPosition(sourceNode.getPort('left1').getCenter());
    diagramLink
      .getLastPoint()
      .setPosition(targetNode.getPort('right1').getCenter());
    diagramModel.addLink(diagramLink);
  });
};
