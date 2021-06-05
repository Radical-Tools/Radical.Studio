import {
  SelectingState,
  State,
  Action,
  InputType,
  DragCanvasState,
  BaseModel,
} from '@projectstorm/react-canvas-core';
import { PortModel, DragNewLinkState } from '@projectstorm/react-diagrams';
import CreateLinkState from './CreateLinkState';
import RadicalDragDiagramItemsState from './RadicalDragDiagramItemsState';

export default class RadicalState extends State {
  constructor() {
    super({
      name: 'default-diagrams',
    });
    this.childStates = [new SelectingState()];
    this.dragCanvas = new DragCanvasState();
    this.dragNewLink = new DragNewLinkState();
    this.dragItems = new RadicalDragDiagramItemsState();
    this.createLink = new CreateLinkState();
    // determine what was clicked on
    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: (event) => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(event);

          // the canvas was clicked on, transition to the dragging canvas state
          if (!element) {
            this.transitionWithEvent(this.dragCanvas, event);
          }
          // move the items (and potentially link points)
          else if (element instanceof BaseModel) {
            this.transitionWithEvent(this.dragItems, event);
          }
        },
      })
    );
    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        fire: (event) => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(event);

          if (element instanceof PortModel)
            this.transitionWithEvent(this.createLink, event);
        },
      })
    );
  }
}
