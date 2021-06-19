import { ZoomCanvasAction } from '@projectstorm/react-canvas-core';
import { CANVAS_ZOOM_CHANGED } from '../consts';

class RadicalZoomCanvasAction extends ZoomCanvasAction {
  constructor(options) {
    super(options);
    const defaultZoomAction = this.options.fire.bind(this);
    this.options.fire = (actionEvent) => {
      defaultZoomAction(actionEvent);
      this.engine.getModel().fireEvent(
        {
          offsetX: this.engine.getModel().options.offsetX,
          offsetY: this.engine.getModel().options.offsetY,
          zoom: this.engine.getModel().options.zoom,
        },
        CANVAS_ZOOM_CHANGED
      );
    };
  }
}

export default RadicalZoomCanvasAction;
