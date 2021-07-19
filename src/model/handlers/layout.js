import set from 'lodash/fp/set';
import toPairs from 'lodash/fp/toPairs';
import flow from 'lodash/fp/flow';
import {
  LAYOUT_MAX_ROWS,
  MIN_HEIGHT_NUMBER,
  MIN_WIDTH_NUMBER,
} from '../../app/consts';

export const widgets = {
  model: {
    isActive: true,
    title: 'Model',
    initialDimensions: {
      x: 0,
      y: 1,
      w: 4,
      h: LAYOUT_MAX_ROWS - 1,
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
      h: LAYOUT_MAX_ROWS - 1,
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
      h: LAYOUT_MAX_ROWS - 1,
      minW: 1,
    },
  },
};

export const initialState = {
  layout: {
    windowDimensions: {
      width: MIN_WIDTH_NUMBER,
      height: MIN_HEIGHT_NUMBER,
    },
    showDrawer: false,
    showHomeDialog: true,
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
export const openHomeDialog = (state) =>
  set(['layout', 'showHomeDialog'], true, state);
export const closeHomeDialog = (state) =>
  set(['layout', 'showHomeDialog'], false, state);
export const setWindowDimensions = (state, payload) =>
  flow(
    set(
      ['layout', 'windowDimensions', 'height'],
      payload.height < MIN_HEIGHT_NUMBER ? MIN_HEIGHT_NUMBER : payload.height
    ),
    set(
      ['layout', 'windowDimensions', 'width'],
      payload.width < MIN_WIDTH_NUMBER ? MIN_WIDTH_NUMBER : payload.width
    )
  )(state);
