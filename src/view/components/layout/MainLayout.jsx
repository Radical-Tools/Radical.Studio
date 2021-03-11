import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Box, Card } from '@material-ui/core';
import PropTypes from 'prop-types';
import TopMenu from './TopMenu';
import CardWidget from './CardWidget';
import { THEME_DARK } from '../../../app/consts';
import widgetsComponentMapping from './widgetsComponentMapping';

const ResponsiveGridLayout = WidthProvider(Responsive);
const dragableClassName = 'BoxHeader';
const MainLayout = ({
  onChangeTheme,
  currentTheme,
  layout,
  onLayoutChange,
  onMaximizeWidget,
  onCloseWidget,
  onMinimizeWidget,
  config,
  onAddWidget,
}) => (
  <Box height="100%" alignItems="stretch">
    <ResponsiveGridLayout
      className="layout"
      layouts={layout}
      rowHeight={50}
      useCSSTransforms
      breakpoints={{ lg: 1200 }}
      autoSize
      maxRows={24}
      cols={{ lg: 24 }}
      resizeHandles={['e', 'se', 'ne']}
      draggableHandle={`.${dragableClassName}`}
      onLayoutChange={onLayoutChange}
      isBounded
      compactType="vertical"
      margin={[5, 5]}
      preventCollision
    >
      <div key="top-panel">
        <Card borderRadius="borderRadius" elevation={3}>
          <TopMenu
            onChangeTheme={onChangeTheme}
            isThemeSwitchChecked={currentTheme === THEME_DARK}
            widgetsConfig={config.widgets}
            onAddWidget={onAddWidget}
          />
        </Card>
      </div>
      {config.widgets
        .filter((widget) => widget.isActive)
        .map((widget) => (
          <div key={widget.id}>
            <CardWidget
              id={widget.id}
              title={widget.title}
              className={dragableClassName}
              onClose={onCloseWidget}
              onMaximize={onMaximizeWidget}
              onMinimize={onMinimizeWidget}
            >
              {React.createElement(widgetsComponentMapping[widget.id])}
            </CardWidget>
          </div>
        ))}
    </ResponsiveGridLayout>
  </Box>
);

MainLayout.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  layout: PropTypes.objectOf(PropTypes.any).isRequired,
  config: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  onMaximizeWidget: PropTypes.func.isRequired,
  onCloseWidget: PropTypes.func.isRequired,
  onMinimizeWidget: PropTypes.func.isRequired,
  onAddWidget: PropTypes.func.isRequired,
};
export default MainLayout;
