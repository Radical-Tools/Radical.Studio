import { DragCanvasState } from '@projectstorm/react-canvas-core';

import { DRAG_CANVAS_END_EVENT } from '../consts';

export default class RadicalDragCanvasState extends DragCanvasState {
  deactivated(next) {
    super.deactivated(next);
    this.engine.getModel().fireEvent(
      {
        offsetX: this.engine.getModel().options.offsetX,
        offsetY: this.engine.getModel().options.offsetY,
        zoom: this.engine.getModel().options.zoom,
      },
      DRAG_CANVAS_END_EVENT
    );
  }
}
