import {
  Action,
  InputType,
  MoveItemsState,
} from '@projectstorm/react-canvas-core';
import { PortModel } from '@projectstorm/react-diagrams';

import { DRAG_DIAGRAM_ITEMS_END_EVENT } from '../consts';
import CreateLinkState from './CreateLinkState';

export default class RadicalDragDiagramItemsState extends MoveItemsState {
  constructor() {
    super();
    this.createLink = new CreateLinkState();
    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        fire: (event) => {
          const item = this.engine.getMouseElement(event.event);
          if (item instanceof PortModel) {
            this.transitionWithEvent(this.createLink, event);
          }
          const model = this.engine.getModel();
          const items = model.getSelectedEntities();
          const point = this.engine.getRelativeMousePoint(event.event);
          model.fireEvent(
            {
              point,
              items,
            },
            DRAG_DIAGRAM_ITEMS_END_EVENT
          );
        },
      })
    );
  }
}
