import set from 'lodash/fp/set';
import toPairs from 'lodash/fp/toPairs';

export const widgets = {
  model: {
    isActive: true,
    title: 'Model',
    initialDimensions: {
      x: 0,
      y: 1,
      w: 4,
      h: 16,
      minW: 1,
    },
  },
  canvas: {
    isActive: true,
    title: 'Canvas',
    initialDimensions: {
      x: 4,
      y: 1,
      w: 16,
      h: 16,
      minW: 4,
      minH: 1,
    },
  },
  metamodel: {
    isActive: true,
    title: 'Metamodel',
    initialDimensions: {
      x: 20,
      y: 1,
      w: 4,
      h: 16,
      minW: 1,
    },
  },
};

export const initialState = {
  layout: {
    showDrawer: false,
    config: {
      widgets,
    },
    gridLayout: {
      lg: [
        { i: 'top-panel', x: 0, y: 0, w: 24, h: 1, static: true },
        ...toPairs(widgets).map(([key, widget]) => ({
          i: key,
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

export const setGridLayout = (state, gridLayout) =>
  set(['layout', 'gridLayout', 'lg'], gridLayout, state);

export const performMaximize = (state, widgetId) =>
  set(
    ['layout', 'gridLayout', 'lg'],
    state.layout.gridLayout.lg.map((widgetConfig) => {
      if (widgetConfig.i === widgetId)
        return {
          ...widgetConfig,
          h: 14,
          w: 24,
          x: 1,
          y: 1,
        };
      if (!widgetConfig.static) return { ...widgetConfig, h: 1, w: 5, y: 15 };
      return widgetConfig;
    }),
    state
  );
export const performMinimize = (state, widgetId) =>
  set(
    ['layout', 'gridLayout', 'lg'],
    state.layout.gridLayout.lg.map((widgetConfig) => {
      if (widgetConfig.i === widgetId)
        return {
          ...widgetConfig,
          h: 1,
        };
      return widgetConfig;
    }),
    state
  );
export const performClose = (state, widgetId) =>
  set(['layout', 'config', 'widgets', widgetId, 'isActive'], false, state);
export const performAdd = (state, widgetId) =>
  set(['layout', 'config', 'widgets', widgetId, 'isActive'], true, state);
export const toggleDrawer = (state) =>
  set(['layout', 'showDrawer'], !state.layout.showDrawer, state);
