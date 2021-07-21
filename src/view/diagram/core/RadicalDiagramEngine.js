import { DiagramEngine } from '@projectstorm/react-diagrams';

export default class RadicalDiagramEngine extends DiagramEngine {
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
}
