import React from 'react';
import toPairs from 'lodash/fp/toPairs';
import { Box, Card } from '@material-ui/core';
import { Responsive, WidthProvider } from 'react-grid-layout';
import PropTypes from 'prop-types';
import TopMenu from './TopMenuContainer';
import CardWrapper from './CardWrapper';
import {
  LAYOUT_HEIGHT_OFFSET_FOR_MARGIN,
  LAYOUT_MARGIN,
  LAYOUT_MAX_COLS,
  LAYOUT_MAX_ROWS,
  THEME_DARK,
} from '../../app/consts';
import panelsMapping from '../panels/panelsMapping';

const ResponsiveGridLayout = WidthProvider(Responsive);
const dragableClassName = 'BoxHeader';
const WidgetsPanel = ({
  onChangeTheme,
  currentTheme,
  layout,
  onLayoutChange,
  onMaximizeWidget,
  onCloseWidget,
  onRestoreWidget,
  onMinimizeWidget,
  onToggleDrawer,
  config,
  windowDimensions,
}) => (
  <Box height="100%" alignItems="stretch">
    <ResponsiveGridLayout
      className="layout"
      layouts={layout}
      rowHeight={
        (windowDimensions.height - LAYOUT_HEIGHT_OFFSET_FOR_MARGIN) /
        LAYOUT_MAX_ROWS
      }
      useCSSTransforms
      breakpoints={{ lg: 1200 }}
      autoSize
      maxRows={LAYOUT_MAX_ROWS}
      cols={{ lg: LAYOUT_MAX_COLS }}
      resizeHandles={['e', 'se', 'ne']}
      draggableHandle={`.${dragableClassName}`}
      onLayoutChange={onLayoutChange}
      compactType="vertical"
      margin={[LAYOUT_MARGIN, LAYOUT_MARGIN]}
      preventCollision
      isDraggable={false}
      isResizable={false}
    >
      <div key="top-panel">
        <Card elevation={3}>
          <TopMenu
            onChangeTheme={onChangeTheme}
            onShowDrawer={onToggleDrawer}
            isThemeSwitchChecked={currentTheme === THEME_DARK}
          />
        </Card>
      </div>
      {toPairs(config.widgets)
        .filter(([, widget]) => widget.isActive)
        .map(([key, widget]) => (
          <div id={key} key={key}>
            <CardWrapper
              id={key}
              title={widget.title}
              className={dragableClassName}
              onClose={widget.canBeClosed ? onCloseWidget : undefined}
              onRestore={widget.canBeMaximized ? onRestoreWidget : undefined}
              onMaximize={widget.canBeMaximized ? onMaximizeWidget : undefined}
              onMinimize={widget.canBeMinimized ? onMinimizeWidget : undefined}
              isMaximized={widget.isMaximized}
              removeOverflow={widget.removeOverflow}
            >
              {React.createElement(panelsMapping[key])}
            </CardWrapper>
          </div>
        ))}
    </ResponsiveGridLayout>
  </Box>
);
export default WidgetsPanel;

WidgetsPanel.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  layout: PropTypes.objectOf(PropTypes.any).isRequired,
  config: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  onMaximizeWidget: PropTypes.func.isRequired,
  onCloseWidget: PropTypes.func.isRequired,
  onRestoreWidget: PropTypes.func.isRequired,
  onMinimizeWidget: PropTypes.func.isRequired,
  onToggleDrawer: PropTypes.func.isRequired,
  windowDimensions: PropTypes.objectOf(PropTypes.any).isRequired,
};
