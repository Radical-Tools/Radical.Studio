import React from 'react';
import PropTypes from 'prop-types';
import Drawer from './Drawer';
import HomeDialog from './HomeDialog';
import metamodels from '../../../data/metamodels';
import WidgetsPanel from './WidgetsPanel';

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
  showHomeDialog,
  onSelectMetamodel,
  onLoadStorage,
  onLoadFile,
  onSave,
}) => (
  <>
    <WidgetsPanel
      currentTheme={currentTheme}
      layout={layout}
      config={config}
      onChangeTheme={onChangeTheme}
      onLayoutChange={onLayoutChange}
      onMaximizeWidget={onMaximizeWidget}
      onCloseWidget={onCloseWidget}
      onMinimizeWidget={onMinimizeWidget}
      onToggleDrawer={onToggleDrawer}
    />
    <Drawer
      widgetsConfig={config.widgets}
      onAddWidget={onAddWidget}
      show={showDrawer}
      onClose={onToggleDrawer}
      onLoadFile={onLoadFile}
      onSave={onSave}
    />
    <HomeDialog
      show={showHomeDialog}
      metamodels={metamodels}
      onSelectMetamodel={onSelectMetamodel}
      onLoadStorage={onLoadStorage}
      onLoadFile={onLoadFile}
    />
  </>
);

MainLayout.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  layout: PropTypes.objectOf(PropTypes.any).isRequired,
  config: PropTypes.objectOf(PropTypes.any).isRequired,
  showDrawer: PropTypes.bool.isRequired,
  showHomeDialog: PropTypes.bool.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  onMaximizeWidget: PropTypes.func.isRequired,
  onCloseWidget: PropTypes.func.isRequired,
  onMinimizeWidget: PropTypes.func.isRequired,
  onAddWidget: PropTypes.func.isRequired,
  onToggleDrawer: PropTypes.func.isRequired,
  onSelectMetamodel: PropTypes.func.isRequired,
  onLoadStorage: PropTypes.func.isRequired,
  onLoadFile: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
export default MainLayout;
