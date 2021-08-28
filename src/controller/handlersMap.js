import * as actions from './actions/actionCreators';
import * as theme from './handlers/theme';
import * as layout from './handlers/layout';
import * as viewModel from './handlers/viewModel';
import * as model from './handlers/model';
import * as common from './handlers/common';
import * as project from './handlers/project';
import * as presentations from './handlers/presentation';
import * as notifications from './handlers/notifications';
import loadState from './handlers/state';

const handlersMap = {
  [actions.themeChanged.toString()]: theme.changeTheme,
  [actions.layoutSet.toString()]: layout.setGridLayout,
  [actions.layoutWidgetMaximize.toString()]: layout.performMaximize,
  [actions.layoutWidgetMinimize.toString()]: layout.performMinimize,
  [actions.layoutWidgetClose.toString()]: layout.performClose,
  [actions.layoutWidgetAdd.toString()]: layout.performAdd,
  [actions.layoutDrawerToggle.toString()]: layout.toggleDrawer,
  [actions.modelObjectAdd.toString()]: (state, payload) =>
    viewModel.updateCurrentView(model.addObject(state, payload)),
  [actions.modelRelationAdd.toString()]: (state, payload) =>
    viewModel.updateCurrentView(model.addRelation(state, payload)),
  [actions.modelObjectRemove.toString()]: (state, payload) =>
    viewModel.updateCurrentView(model.removeObject(state, payload)),
  [actions.modelRelationRemove.toString()]: (state, payload) =>
    viewModel.updateCurrentView(model.removeRelation(state, payload)),
  [actions.modelObjectUpdate.toString()]: (state, payload) =>
    viewModel.updateCurrentView(model.updateObject(state, payload)),
  [actions.modelItemUpdateName.toString()]: (state, payload) =>
    viewModel.updateCurrentView(model.updateItemName(state, payload)),
  [actions.modelRelationUpdate.toString()]: (state, payload) =>
    viewModel.updateCurrentView(model.updateRelation(state, payload)),
  [actions.modelItemCreate.toString()]: common.createItem,
  [actions.modelItemEdit.toString()]: (state, payload) =>
    payload.type === 'view'
      ? viewModel.updateCurrentView(
          viewModel.activateView(common.editItem(state, payload), payload)
        )
      : common.editItem(state, payload),
  [actions.modelItemUpsert.toString()]: (state, payload) =>
    viewModel.updateCurrentView(common.upsertItem(state, payload)),
  [actions.initProject.toString()]: (state, payload) =>
    project.init(
      model.selectMetamodel(layout.closeHomeDialog(state), payload.metamodel),
      payload
    ),
  [actions.viewModelViewAdd.toString()]: viewModel.addView,
  [actions.viewModelViewRemove.toString()]: viewModel.removeView,
  [actions.viewModelNodeAdd.toString()]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.addNode(state, payload)),
  [actions.viewModelMetamodelObjectAdd.toString()]: (state, payload) =>
    common.editItem(
      viewModel.updateCurrentView(
        viewModel.addNode(model.addObject(state, payload), payload)
      ),
      {
        id: payload.id,
        type: 'object',
      }
    ),
  [actions.viewModelLinkRemove.toString()]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.removeLink(state, payload)),
  [actions.viewModelLinkAdd.toString()]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.addLink(state, payload)),
  [actions.viewModelViewActivate.toString()]: (state, payload) =>
    viewModel.updateCurrentView(
      presentations.updateStepView(
        viewModel.activateView(state, payload),
        payload
      )
    ),
  [actions.viewModelViewUpdate.toString()]: viewModel.updateView,
  [actions.viewModelNodeUpdate.toString()]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.updateNode(state, payload)),
  [actions.viewModelNodeRemove.toString()]: (state, payload) =>
    viewModel.updateCurrentView(viewModel.removeNode(state, payload)),
  [actions.viewModelViewAlignmentUpdate.toString()]: (state, payload) =>
    presentations.updateStepAlignment(
      viewModel.viewAlignmentUpdate(state, payload),
      payload
    ),
  [actions.viewModelLayoutAlign.toString()]: viewModel.alignLayout,
  [actions.viewModelNodeCollapse.toString()]: (state, payload) =>
    viewModel.alignChildren(
      viewModel.updateCurrentView(viewModel.collapseNode(state, payload)),
      payload,
      state.viewModel.views[state.viewModel.current].nodes[payload.id].dimension
    ),
  [actions.viewModelNodeExpand.toString()]: (state, payload) =>
    viewModel.alignChildren(
      viewModel.updateCurrentView(viewModel.expandNode(state, payload)),
      payload,
      state.viewModel.views[state.viewModel.current].nodes[payload.id].dimension
    ),
  [actions.viewModelItemSelectionChanged.toString()]: (state, payload) =>
    viewModel.updateCurrentView(
      common.editItem(viewModel.itemSelectionChanged(state, payload), payload)
    ),
  [actions.modelObjectDetach.toString()]: (state, payload) =>
    viewModel.updateCurrentView(model.objectDetach(state, payload)),
  [actions.notificationAdd.toString()]: notifications.addNotification,
  [actions.notificationRemove.toString()]: notifications.removeNotifcation,
  [actions.loadStateStorage.toString()]: loadState,
  [actions.stateLoad.toString()]: loadState,
  [actions.setWindowDimensions.toString()]: layout.setWindowDimensions,
  [actions.layoutWidgetRestore.toString()]: layout.performRestore,
  [actions.layoutModeChange.toString()]: layout.setMode,
  [actions.presentationSelect.toString()]: presentations.select,
  [actions.presentationCreate.toString()]: presentations.create,
  [actions.presentationUpdateName.toString()]: presentations.updateName,
  [actions.presentationRemove.toString()]: presentations.remove,
  [actions.presentationSetGoTo.toString()]: presentations.goToStep,
  [actions.presentationStepAppend.toString()]: presentations.appendStep,
  [actions.presentationStepRemove.toString()]: presentations.removeStep,
};

export default handlersMap;
