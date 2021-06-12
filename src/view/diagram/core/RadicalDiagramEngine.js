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
}
