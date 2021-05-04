import { DiagramModel } from '@projectstorm/react-diagrams';
import RadicalComposedNodeModel from '../nodes/RadicalComposedNodeModel';

export default class RadicalDiagramModel extends DiagramModel {
  setInitialZoomLevel(zoom) {
    this.options.zoom = zoom;
  }

  setInitialOffset(offsetX, offsetY) {
    this.options.offsetX = offsetX;
    this.options.offsetY = offsetY;
  }

  getLayers() {
    return [...this.layers].reverse();
  }

  // eslint-disable-next-line class-methods-use-this
  onNodePositionChanged(node) {
    node.getLinks().forEach((link) => {
      link.update();
    });
  }

  addNode(node) {
    node.registerListener({
      eventDidFire: (payload) => this.handleEvents(payload),
    });

    return super.addNode(node);
  }

  addLink(link) {
    const ret = super.addLink(link);
    link.update();
    return ret;
  }

  handleEvents(payload) {
    switch (payload.function) {
      case 'positionChanged':
        if (payload.entity instanceof RadicalComposedNodeModel) {
          this.onNodePositionChanged(payload.entity);
        }
        break;
      default:
        break;
    }
  }
}
