import { DiagramModel } from '@projectstorm/react-diagrams';

export default class RadicalDiagramModel extends DiagramModel {
  setInitialZoomLevel(zoom) {
    this.options.zoom = zoom;
  }

  setInitialOffset(offsetX, offsetY) {
    this.options.offsetX = offsetX;
    this.options.offsetY = offsetY;
  }

  getLayers() {
    return [...this.layers];
  }

  addLink(link) {
    const ret = super.addLink(link);
    link.update();
    return ret;
  }
}
