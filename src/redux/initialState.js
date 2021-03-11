import { THEME_LIGHT } from '../app/consts';
import { widgets } from '../model/layout';

const initialState = {
  theme: {
    current: THEME_LIGHT,
  },
  layout: {
    config: {
      widgets: [...widgets],
    },
    gridLayout: {
      lg: [
        { i: 'top-panel', x: 0, y: 0, w: 24, h: 1, static: true },
        ...widgets.map((widget) => ({
          i: widget.id,
          x: widget.initialDimensions.x,
          y: widget.initialDimensions.y,
          w: widget.initialDimensions.w,
          h: widget.initialDimensions.h,
          minW: widget.initialDimensions.minW,
          minH: widget.initialDimensions.minH,
        })),
      ],
    },
  },
};
export default initialState;
