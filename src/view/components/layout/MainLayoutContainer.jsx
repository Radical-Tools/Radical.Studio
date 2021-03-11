import { connect } from 'react-redux';
import {
  layoutSet,
  layoutWidgetAdd,
  layoutWidgetClose,
  layoutWidgetMaximize,
  layoutWidgetMinimize,
  themeChanged,
} from '../../../redux/action-creators';
import MainLayout from './MainLayout';

const mapStateToProps = (state) => ({
  currentTheme: state.theme.current,
  layout: state.layout.gridLayout,
  config: state.layout.config,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeTheme: () => dispatch(themeChanged()),
  onLayoutChange: (layout) => dispatch(layoutSet(layout)),
  onMaximizeWidget: (widgetId) => dispatch(layoutWidgetMaximize(widgetId)),
  onMinimizeWidget: (widgetId) => dispatch(layoutWidgetMinimize(widgetId)),
  onCloseWidget: (widgetId) => dispatch(layoutWidgetClose(widgetId)),
  onAddWidget: (widgetId) => dispatch(layoutWidgetAdd(widgetId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
