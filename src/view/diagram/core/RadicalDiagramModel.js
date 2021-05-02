import { DiagramModel } from '@projectstorm/react-diagrams';

export default class RadicalDiagramModel extends DiagramModel {
  setZoomLevelInitial(zoom) {
    this.options.zoom = zoom;
  }

  setOffsetInitial(offsetX, offsetY) {
    this.options.offsetX = offsetX;
    this.options.offsetY = offsetY;
  }
}
