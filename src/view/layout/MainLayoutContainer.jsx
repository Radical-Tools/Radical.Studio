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
} from '../../model/state/action-creators';
import MainLayout from './MainLayout';

const mapStateToProps = (state) => ({
  currentTheme: state.theme.current,
  layout: state.layout.gridLayout,
  config: state.layout.config,
  showDrawer: state.layout.showDrawer,
  showHomeDialog: state.layout.showHomeDialog,
  windowDimensions: state.layout.windowDimensions,
  mode: state.layout.mode,
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
  onCloseHomeDialog: () => dispatch(layoutDrawerToggle()),
  onSubmitProjectForm: (data) => dispatch(initProject(data)),
  onLoadStorage: (name) => dispatch(loadStateStorage(name)),
  onLoadFile: (state) => dispatch(stateLoad(state)),
  onSave: () => dispatch(stateSave()),
  onSetMode: (mode) => dispatch(layoutModeChange(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
