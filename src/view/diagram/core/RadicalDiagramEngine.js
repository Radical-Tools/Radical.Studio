import { DiagramEngine } from '@projectstorm/react-diagrams';
import { Toolkit } from '@projectstorm/react-canvas-core';

export default class RadicalDiagramEngine extends DiagramEngine {
  getMouseElement(event) {
    const diagramModel = this.model;
    const { target } = event;
    let element = Toolkit.closest(target, '.port[data-name]');
    const targets = document.elementsFromPoint(event.clientX, event.clientY);
    [element] = targets.filter((el) => el.matches('.port[data-name]'));
    if (element) {
      const nodeElement = Toolkit.closest(element, '.node[data-nodeid]');
      return diagramModel
        .getNode(nodeElement.getAttribute('data-nodeid'))
        .getPort(element.getAttribute('data-name'));
    }
    return super.getMouseElement(event);
  }
}
