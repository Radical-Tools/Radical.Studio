import {
  SelectingState,
  State,
  Action,
  InputType,
  BaseModel,
} from '@projectstorm/react-canvas-core';
import { DragNewLinkState } from '@projectstorm/react-diagrams';
import RadicalDragCanvasState from './RadicalDragCanvasState';
import RadicalDragDiagramItemsState from './RadicalDragDiagramItemsState';

export default class RadicalState extends State {
  constructor() {
    super({
      name: 'default-diagrams',
    });
    this.childStates = [new SelectingState()];
    this.dragCanvas = new RadicalDragCanvasState();
    this.dragNewLink = new DragNewLinkState();
    this.dragItems = new RadicalDragDiagramItemsState();
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
  }
}
