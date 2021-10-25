import { DiagramEngine } from '@projectstorm/react-diagrams';
import gsap from 'gsap';

export default class RadicalDiagramEngine extends DiagramEngine {
  constructor() {
    super();
    this.selectionEnabled = false;
    this.editEnabled = false;
  }

  getMouseElement(event) {
    const targets = document.elementsFromPoint(event.clientX, event.clientY);

    // look for control elements of node (i.e. collapse, expand, link buttons)
    const [controlEl] = targets.filter((el) => el.matches('.controlEl'));
    if (controlEl) {
      return { type: 'controlEl' };
    }
    return super.getMouseElement(event);
  }

  getNodeAtPosition(x, y) {
    const targets = document.elementsFromPoint(x, y);

    // look for control elements of node (i.e. collapse, expand, link buttons)
    const [controlEl] = targets.filter((el) => el.matches('.controlEl'));
    if (controlEl) {
      return { type: 'controlEl' };
    }

    const [element] = targets.filter((el) => el.matches('.node[data-nodeid]'));
    if (element) {
      return this.getModel().getNode(element.getAttribute('data-nodeid'));
    }

    return undefined;
  }

  moveWithAnim(
    sourceZoomLevel,
    sourceOffsetX,
    sourceOffsetY,
    targetZoomLevel,
    targetOffsetX,
    targetOffsetY
  ) {
    const obj = { zoomLevel: 0, offsetX: 0, offsetY: 0 };
    gsap.fromTo(
      obj,
      {
        zoomLevel: sourceZoomLevel,
        offsetX: sourceOffsetX,
        offsetY: sourceOffsetY,
      },
      {
        zoomLevel: targetZoomLevel,
        offsetX: targetOffsetX,
        offsetY: targetOffsetY,
        duration: 0.4,
        onUpdate: () => {
          this.getModel().setZoomLevel(obj.zoomLevel);
          this.getModel().setOffset(obj.offsetX, obj.offsetY);
          this.repaintCanvas();
        },
      }
    );
  }

  getSelectionEnabled() {
    return this.selectionEnabled;
  }

  setSelectionEnabled(selectionEnabled) {
    this.selectionEnabled = selectionEnabled;
  }

  getEditEnabled() {
    return this.editEnabled;
  }

  setEditEnabled(editEnabled) {
    this.editEnabled = editEnabled;
  }
}
