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
  onRestoreWidget,
  onMinimizeWidget,
  config,
  onAddWidget,
  onToggleDrawer,
  showDrawer,
  showHomeDialog,
  onSubmitProjectForm,
  onLoadStorage,
  onLoadFile,
  onSave,
  onSetMode,
  windowDimensions,
  mode,
}) => (
  <>
    <div>Test proper</div>
    <WidgetsPanel
      currentTheme={currentTheme}
      layout={layout}
      config={config}
      onChangeTheme={onChangeTheme}
      onLayoutChange={onLayoutChange}
      onMaximizeWidget={onMaximizeWidget}
      onCloseWidget={onCloseWidget}
      onRestoreWidget={onRestoreWidget}
      onMinimizeWidget={onMinimizeWidget}
      onToggleDrawer={onToggleDrawer}
      windowDimensions={windowDimensions}
    />
    <Drawer
      onAddWidget={onAddWidget}
      show={showDrawer}
      onClose={onToggleDrawer}
      onLoadFile={onLoadFile}
      onSave={onSave}
      onSetMode={onSetMode}
      mode={mode}
    />
    <HomeDialog
      show={showHomeDialog}
      metamodels={metamodels}
      onSubmitProjectForm={onSubmitProjectForm}
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
  onRestoreWidget: PropTypes.func.isRequired,
  onMinimizeWidget: PropTypes.func.isRequired,
  onAddWidget: PropTypes.func.isRequired,
  onToggleDrawer: PropTypes.func.isRequired,
  onSubmitProjectForm: PropTypes.func.isRequired,
  onLoadStorage: PropTypes.func.isRequired,
  onLoadFile: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSetMode: PropTypes.func.isRequired,
  windowDimensions: PropTypes.objectOf(PropTypes.any).isRequired,
  mode: PropTypes.string.isRequired,
};
export default MainLayout;
