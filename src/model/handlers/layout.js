export const widgets = [
  {
    id: 'model',
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
  {
    id: 'canvas',
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
  {
    id: 'metamodel',
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
];

export const initialState = {
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

export const setGridLayout = (state, gridLayout) => ({
  ...state,
  layout: {
    ...state.layout,
    gridLayout: {
      lg: gridLayout,
    },
  },
});
export const performMaximize = (state, widgetId) => ({
  ...state,
  layout: {
    ...state.layout,
    gridLayout: {
      lg: state.layout.gridLayout.lg.map((widgetConfig) => {
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
    },
  },
});
export const performMinimize = (state, widgetId) => ({
  ...state,
  layout: {
    ...state.layout,
    gridLayout: {
      lg: state.layout.gridLayout.lg.map((widgetConfig) => {
        if (widgetConfig.i === widgetId)
          return {
            ...widgetConfig,
            h: 1,
          };
        return widgetConfig;
      }),
    },
  },
});

export const performClose = (state, widgetId) => ({
  ...state,
  layout: {
    ...state.layout,
    config: {
      widgets: state.layout.config.widgets.map((widgetConfig) => {
        if (widgetConfig.id === widgetId)
          return {
            ...widgetConfig,
            isActive: false,
          };
        return widgetConfig;
      }),
    },
  },
});
export const performAdd = (state, widgetId) => ({
  ...state,
  layout: {
    ...state.layout,
    config: {
      widgets: state.layout.config.widgets.map((widgetConfig) => {
        if (widgetConfig.id === widgetId)
          return {
            ...widgetConfig,
            isActive: true,
          };
        return widgetConfig;
      }),
    },
  },
});
