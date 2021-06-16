import { connect } from 'react-redux';
import {
  layoutDrawerToggle,
  layoutSet,
  layoutWidgetAdd,
  layoutWidgetClose,
  layoutWidgetMaximize,
  layoutWidgetMinimize,
  loadStateStorage,
  modelMetamodelSelect,
  stateLoad,
  themeChanged,
} from '../../../redux/action-creators';
import MainLayout from './MainLayout';

const mapStateToProps = (state) => ({
  currentTheme: state.theme.current,
  layout: state.layout.gridLayout,
  config: state.layout.config,
  showDrawer: state.layout.showDrawer,
  showHomeDialog: state.layout.showHomeDialog,
  state,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeTheme: () => dispatch(themeChanged()),
  onLayoutChange: (layout) => dispatch(layoutSet(layout)),
  onMaximizeWidget: (widgetId) => dispatch(layoutWidgetMaximize(widgetId)),
  onMinimizeWidget: (widgetId) => dispatch(layoutWidgetMinimize(widgetId)),
  onCloseWidget: (widgetId) => dispatch(layoutWidgetClose(widgetId)),
  onAddWidget: (widgetId) => dispatch(layoutWidgetAdd(widgetId)),
  onToggleDrawer: () => dispatch(layoutDrawerToggle()),
  onCloseHomeDialog: () => dispatch(layoutDrawerToggle()),
  onSelectMetamodel: (metamodelId) =>
    dispatch(modelMetamodelSelect(metamodelId)),
  onLoadStorage: () => dispatch(loadStateStorage()),
  onLoadFile: (state) => dispatch(stateLoad(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
