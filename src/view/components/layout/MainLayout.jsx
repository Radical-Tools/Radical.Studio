import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Box, Card } from '@material-ui/core';
import PropTypes from 'prop-types';
import toPairs from 'lodash/fp/toPairs';
import TopMenu from './TopMenu';
import CardWrapper from './CardWrapper';
import { THEME_DARK } from '../../../app/consts';
import widgetsComponentMapping from '../widgets/widgetsComponentMapping';
import Drawer from './Drawer';

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
  onToggleDrawer,
  showDrawer,
}) => (
  <>
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
            <div key={key}>
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
    <Drawer
      widgetsConfig={config.widgets}
      onAddWidget={onAddWidget}
      show={showDrawer}
      onClose={onToggleDrawer}
    />
  </>
);

MainLayout.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  layout: PropTypes.objectOf(PropTypes.any).isRequired,
  config: PropTypes.objectOf(PropTypes.any).isRequired,
  showDrawer: PropTypes.bool.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  onMaximizeWidget: PropTypes.func.isRequired,
  onCloseWidget: PropTypes.func.isRequired,
  onMinimizeWidget: PropTypes.func.isRequired,
  onAddWidget: PropTypes.func.isRequired,
  onToggleDrawer: PropTypes.func.isRequired,
};
export default MainLayout;
