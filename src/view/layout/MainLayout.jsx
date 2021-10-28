import React from 'react';
import PropTypes from 'prop-types';
import Drawer from './Drawer';
import HomeDialog from './HomeDialog';
import metamodels from '../../data/metamodels/metamodels';
import WidgetsPanel from './WidgetsPanel';
import AdminDialog from './AdminDialog';

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
  onToggleAdminDialog,
  showDrawer,
  showHomeDialog,
  showAdminDialog,
  onSubmitProjectForm,
  onLoadStorage,
  onLoadFile,
  onSave,
  onSetMode,
  windowDimensions,
  mode,
  isShowModeEnabled,
  isPresentationModeEnabled,
  undoCmd,
  redoCmd,
  isUndoFirst,
  isUndoLast,
  onEditProjectName,
  projectName,
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
      onRestoreWidget={onRestoreWidget}
      onMinimizeWidget={onMinimizeWidget}
      onToggleDrawer={onToggleDrawer}
      windowDimensions={windowDimensions}
    />
    <Drawer
      onAddWidget={onAddWidget}
      show={showDrawer}
      onClose={onToggleDrawer}
      onToggleAdminDialog={onToggleAdminDialog}
      onLoadFile={onLoadFile}
      onSave={onSave}
      onSetMode={onSetMode}
      mode={mode}
      isShowModeEnabled={isShowModeEnabled}
      isPresentationModeEnabled={isPresentationModeEnabled}
      undoCmd={undoCmd}
      redoCmd={redoCmd}
      isUndoFirst={isUndoFirst}
      isUndoLast={isUndoLast}
    />
    <HomeDialog
      show={showHomeDialog}
      metamodels={metamodels}
      onSubmitProjectForm={onSubmitProjectForm}
      onLoadStorage={onLoadStorage}
      onLoadFile={onLoadFile}
    />
    <AdminDialog
      onEditProjectName={onEditProjectName}
      show={showAdminDialog}
      projectName={projectName}
    />
  </>
);

MainLayout.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  layout: PropTypes.objectOf(PropTypes.any).isRequired,
  config: PropTypes.objectOf(PropTypes.any).isRequired,
  showDrawer: PropTypes.bool.isRequired,
  showHomeDialog: PropTypes.bool.isRequired,
  showAdminDialog: PropTypes.bool.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  onMaximizeWidget: PropTypes.func.isRequired,
  onCloseWidget: PropTypes.func.isRequired,
  onRestoreWidget: PropTypes.func.isRequired,
  onMinimizeWidget: PropTypes.func.isRequired,
  onAddWidget: PropTypes.func.isRequired,
  onToggleDrawer: PropTypes.func.isRequired,
  onToggleAdminDialog: PropTypes.func.isRequired,
  onSubmitProjectForm: PropTypes.func.isRequired,
  onLoadStorage: PropTypes.func.isRequired,
  onLoadFile: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSetMode: PropTypes.func.isRequired,
  windowDimensions: PropTypes.objectOf(PropTypes.any).isRequired,
  mode: PropTypes.string.isRequired,
  isShowModeEnabled: PropTypes.bool.isRequired,
  isPresentationModeEnabled: PropTypes.bool.isRequired,
  undoCmd: PropTypes.func.isRequired,
  redoCmd: PropTypes.func.isRequired,
  isUndoFirst: PropTypes.bool.isRequired,
  isUndoLast: PropTypes.bool.isRequired,
  onEditProjectName: PropTypes.bool.isRequired,
};
export default MainLayout;
