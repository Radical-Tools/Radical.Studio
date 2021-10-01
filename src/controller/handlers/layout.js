import set from 'lodash/fp/set';
import toPairs from 'lodash/fp/toPairs';
import flow from 'lodash/fp/flow';
import {
  LAYOUT_MAX_COLS,
  LAYOUT_MAX_ROWS,
  LAYOUT_MODE,
  MIN_HEIGHT_NUMBER,
  MIN_WIDTH_NUMBER,
} from '../../app/consts';
import getWidgets from '../../data/layoutData';

export const initialState = {
  layout: {
    savedGridLayout: {},
    savedConfig: {},
    windowDimensions: {
      width: MIN_WIDTH_NUMBER,
      height: MIN_HEIGHT_NUMBER,
    },
    showDrawer: false,
    showHomeDialog: true,
    config: {
      widgets: getWidgets(),
    },
    gridLayout: {
      lg: [
        { i: 'top-panel', x: 0, y: 0, w: 24, h: 1, static: true },
        ...toPairs(getWidgets()).map(([key, widget]) => ({
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
    mode: LAYOUT_MODE.EDIT,
  },
};

export const setGridLayout = (state, gridLayout) =>
  set(['layout', 'gridLayout', 'lg'], gridLayout, state);

export const performMaximize = (state, widgetId) =>
  flow(
    set(['layout', 'savedGridLayout'], state.layout.gridLayout),
    set(['layout', 'savedConfig'], state.layout.config),
    set(
      ['layout', 'gridLayout', 'lg'],
      state.layout.gridLayout.lg.map((widgetConfig) => {
        if (widgetConfig.i === widgetId)
          return {
            ...widgetConfig,
            h: LAYOUT_MAX_ROWS,
            w: LAYOUT_MAX_COLS,
            x: 1,
            y: 1,
          };
        if (!widgetConfig.static) return { ...widgetConfig, h: 0, w: 5, y: 15 };
        return { ...widgetConfig, h: 0 };
      })
    ),
    state.layout.gridLayout.lg.map((widgetConfig) =>
      set(
        ['layout', 'config', 'widgets', widgetConfig.i, 'isActive'],
        widgetConfig.i === widgetId
      )
    ),
    set(['layout', 'config', 'widgets', widgetId, 'isMaximized'], true)
  )(state);
export const performRestore = (state) =>
  flow(
    set(['layout', 'gridLayout'], state.layout.savedGridLayout),
    set(['layout', 'config'], state.layout.savedConfig)
  )(state);
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

export const setMode = (state, payload) =>
  payload.mode !== state.layout.mode
    ? flow(
        set(['layout', 'savedGridLayout'], state.layout.gridLayout),
        set(['layout', 'savedConfig'], state.layout.config),
        set(['layout', 'config', 'widgets'], getWidgets(payload.mode)),
        set(
          ['layout', 'gridLayout', 'lg'],
          [
            { i: 'top-panel', x: 0, y: 0, w: 24, h: 1, static: true },
            ...toPairs(getWidgets(payload.mode)).map(([key, widget]) => ({
              i: key,
              x: widget.initialDimensions.x,
              y: widget.initialDimensions.y,
              w: widget.initialDimensions.w,
              h: widget.initialDimensions.h,
              minW: widget.initialDimensions.minW,
              minH: widget.initialDimensions.minH,
            })),
          ]
        ),
        set(['layout', 'mode'], payload.mode),
        set(['layout', 'showDrawer'], false)
      )(state)
    : state;
