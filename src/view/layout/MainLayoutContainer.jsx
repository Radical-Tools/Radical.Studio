import { connect } from 'react-redux';
import {
  layoutDrawerToggle,
  layoutSet,
  layoutWidgetAdd,
  layoutWidgetClose,
  layoutWidgetMaximize,
  layoutWidgetMinimize,
  layoutWidgetRestore,
  loadStateStorage,
  initProject,
  stateLoad,
  stateSave,
  themeChanged,
  layoutModeChange,
  undo,
  redo,
  projectEditName,
  layoutAdminDialogToggle,
} from '../../controller/actions/actionCreators';
import MainLayout from './MainLayout';

const mapStateToProps = (state) => ({
  currentTheme: state.theme.current,
  layout: state.layout.gridLayout,
  config: state.layout.config,
  showDrawer: state.layout.showDrawer,
  projectName: state.project.name,
  showHomeDialog: state.layout.showHomeDialog,
  showAdminDialog: state.layout.showAdminDialog,
  windowDimensions: state.layout.windowDimensions,
  mode: state.layout.mode,
  isPresentationModeEnabled:
    state.history.prev.length > 0 || state.history.next.length > 0,
  isShowModeEnabled: state.presentationModel.current !== undefined,
  isUndoFirst: state.undo.prev.length === 0,
  isUndoLast: state.undo.next.length === 0,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeTheme: () => dispatch(themeChanged()),
  onLayoutChange: (layout) => dispatch(layoutSet(layout)),
  onMaximizeWidget: (widgetId) => dispatch(layoutWidgetMaximize(widgetId)),
  onMinimizeWidget: (widgetId) => dispatch(layoutWidgetMinimize(widgetId)),
  onCloseWidget: (widgetId) => dispatch(layoutWidgetClose(widgetId)),
  onRestoreWidget: (widgetId) => dispatch(layoutWidgetRestore(widgetId)),
  onAddWidget: (widgetId) => dispatch(layoutWidgetAdd(widgetId)),
  onToggleDrawer: () => dispatch(layoutDrawerToggle()),
  onToggleAdminDialog: () => dispatch(layoutAdminDialogToggle()),
  onCloseHomeDialog: () => dispatch(layoutDrawerToggle()),
  onSubmitProjectForm: (data) => dispatch(initProject(data)),
  onLoadStorage: (name) => dispatch(loadStateStorage(name)),
  onLoadFile: (state) => dispatch(stateLoad(state)),
  onEditProjectName: (data) => dispatch(projectEditName(data)),
  onSave: () => dispatch(stateSave()),
  onSetMode: (mode) => dispatch(layoutModeChange(mode)),
  undoCmd: () => dispatch(undo()),
  redoCmd: () => dispatch(redo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
