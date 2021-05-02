import {
  Action,
  InputType,
  MoveItemsState,
  BasePositionModel,
} from '@projectstorm/react-canvas-core';
import { PortModel } from '@projectstorm/react-diagrams';

import { DRAG_DIAGRAM_ITEMS_END_EVENT } from '../consts';
import RadicalComposedNodeModel from '../nodes/RadicalComposedNodeModel';
import CreateLinkState from './CreateLinkState';

export default class RadicalDragDiagramItemsState extends MoveItemsState {
  mouseMoved = false;

  constructor() {
    super();
    this.createLink = new CreateLinkState();
    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        fire: (event) => {
          const element = this.engine.getMouseElement(event.event);
          if (element instanceof PortModel) {
            this.transitionWithEvent(this.createLink, event);
          }
          const model = this.engine.getModel();
          const items = model.getSelectedEntities();
          if (items) {
            items.forEach((item) => {
              if (item instanceof RadicalComposedNodeModel) {
                item.setIsDragged(false);
              }
            });
          }
          if (this.mouseMoved) {
            const point = this.engine.getRelativeMousePoint(event.event);
            model.fireEvent(
              {
                point,
                items,
              },
              DRAG_DIAGRAM_ITEMS_END_EVENT
            );
          }
        },
      })
    );
  }

  activated(previous) {
    super.activated(previous);
    this.mouseMoved = false;
  }

  fireMouseMoved(event) {
    const items = this.engine.getModel().getSelectedEntities();
    const model = this.engine.getModel();
    this.mouseMoved = true;
    items.forEach((item) => {
      if (item instanceof BasePositionModel) {
        if (!item.isLocked()) {
          if (!this.initialPositions[item.getID()]) {
            this.initialPositions[item.getID()] = {
              point: item.getPosition(),
              item,
            };
            if (item instanceof RadicalComposedNodeModel) {
              item.setIsDragged(true);
            }
          }

          const pos = this.initialPositions[item.getID()].point;
          item.setPosition(
            model.getGridPosition(pos.x + event.virtualDisplacementX),
            model.getGridPosition(pos.y + event.virtualDisplacementY)
          );
        }
      }
    });
    this.engine.repaintCanvas();
  }
}
