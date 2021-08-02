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
} from '../../../redux/action-creators';
import MainLayout from './MainLayout';

const mapStateToProps = (state) => ({
  currentTheme: state.theme.current,
  layout: state.layout.gridLayout,
  config: state.layout.config,
  showDrawer: state.layout.showDrawer,
  showHomeDialog: state.layout.showHomeDialog,
  windowDimensions: state.layout.windowDimensions,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
