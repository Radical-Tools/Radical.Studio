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

export const setGridLayout = (layout, gridLayout) => ({
  ...layout,
  gridLayout: {
    lg: gridLayout,
  },
});
export const performMaximize = (layout, widgetId) => ({
  ...layout,
  gridLayout: {
    lg: layout.gridLayout.lg.map((widgetConfig) => {
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
});
export const performMinimize = (layout, widgetId) => ({
  ...layout,
  gridLayout: {
    lg: layout.gridLayout.lg.map((widgetConfig) => {
      if (widgetConfig.i === widgetId)
        return {
          ...widgetConfig,
          h: 1,
        };
      return widgetConfig;
    }),
  },
});

export const performClose = (layout, widgetId) => ({
  ...layout,
  config: {
    widgets: layout.config.widgets.map((widgetConfig) => {
      if (widgetConfig.id === widgetId)
        return {
          ...widgetConfig,
          isActive: false,
        };
      return widgetConfig;
    }),
  },
});
export const performAdd = (layout, widgetId) => ({
  ...layout,
  config: {
    widgets: layout.config.widgets.map((widgetConfig) => {
      if (widgetConfig.id === widgetId)
        return {
          ...widgetConfig,
          isActive: true,
        };
      return widgetConfig;
    }),
  },
});
