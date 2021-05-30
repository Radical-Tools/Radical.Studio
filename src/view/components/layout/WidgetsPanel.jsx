import React from 'react';
import toPairs from 'lodash/fp/toPairs';
import { Box, Card } from '@material-ui/core';
import { Responsive, WidthProvider } from 'react-grid-layout';
import PropTypes from 'prop-types';
import TopMenu from './TopMenu';
import CardWrapper from './CardWrapper';
import { THEME_DARK } from '../../../app/consts';
import widgetsComponentMapping from '../widgets/widgetsComponentMapping';

const ResponsiveGridLayout = WidthProvider(Responsive);
const dragableClassName = 'BoxHeader';
const WidgetsPanel = ({
  onChangeTheme,
  currentTheme,
  layout,
  onLayoutChange,
  onMaximizeWidget,
  onCloseWidget,
  onMinimizeWidget,
  onToggleDrawer,
  config,
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
              onClose={onCloseWidget}
              onMaximize={onMaximizeWidget}
              onMinimize={onMinimizeWidget}
            >
              {React.createElement(widgetsComponentMapping[key])}
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
  onMinimizeWidget: PropTypes.func.isRequired,
  onToggleDrawer: PropTypes.func.isRequired,
};
