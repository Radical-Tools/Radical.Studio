import * as actions from './actions/actionCreators';
import * as theme from './handlers/theme';
import * as layout from './handlers/layout';
import * as viewModel from './handlers/viewModel';
import * as model from './handlers/model';
import * as common from './handlers/common';
import * as project from './handlers/project';
import * as presentations from './handlers/presentation';
import * as notifications from './handlers/notifications';
import * as history from './handlers/history';
import * as undo from './handlers/undo';
import loadState from './handlers/state';
import { LAYOUT_MODE } from '../app/consts';

export const isLocked = (state) =>
  state.history.next.filter((item) => item.isLocked).length > 0;

const isLockedInfo = (state) =>
  notifications.addNotification(state, {
    id: 1,
    message: 'You cannot modify the previous version of model',
    type: 'info',
  });

const handlersMap = {
  [actions.themeChanged.toString()]: theme.changeTheme,
  [actions.layoutSet.toString()]: layout.setGridLayout,
  [actions.layoutWidgetMaximize.toString()]: layout.performMaximize,
  [actions.layoutWidgetMinimize.toString()]: layout.performMinimize,
  [actions.layoutWidgetClose.toString()]: layout.performClose,
  [actions.layoutWidgetAdd.toString()]: layout.performAdd,
  [actions.layoutDrawerToggle.toString()]: layout.toggleDrawer,
  [actions.modelObjectAdd.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(model.addObject(state, payload))
      : isLockedInfo(state),
  [actions.modelRelationAdd.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(model.addRelation(state, payload))
      : isLockedInfo(state),
  [actions.modelObjectRemove.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(model.removeObject(state, payload))
      : isLockedInfo(state),
  [actions.modelRelationRemove.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(model.removeRelation(state, payload))
      : isLockedInfo(state),
  [actions.modelObjectUpdate.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(model.updateObject(state, payload))
      : isLockedInfo(state),
  [actions.modelItemUpdateName.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(model.updateItemName(state, payload))
      : isLockedInfo(state),
  [actions.modelRelationUpdate.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(model.updateRelation(state, payload))
      : isLockedInfo(state),
  [actions.modelItemCreate.toString()]: (state, payload) =>
    !isLocked(state) ? common.createItem(state, payload) : state,
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
  [actions.viewModelViewAdd.toString()]: (state, payload) =>
    !state.project.isLocked ? viewModel.addView(state, payload) : state,
  [actions.viewModelViewRemove.toString()]: (state, payload) =>
    !state.project.isLocked ? viewModel.removeView(state, payload) : state,
  [actions.viewModelNodeAdd.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(viewModel.addNode(state, payload))
      : isLockedInfo(state),
  [actions.viewModelMetamodelObjectAdd.toString()]: (state, payload) =>
    !isLocked(state)
      ? common.editItem(
          viewModel.updateCurrentView(
            viewModel.addNode(model.addObject(state, payload), payload)
          ),
          {
            id: payload.id,
            type: 'object',
          }
        )
      : isLockedInfo(state),
  [actions.viewModelLinkRemove.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(viewModel.removeLink(state, payload))
      : isLockedInfo(state),
  [actions.viewModelLinkAdd.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(viewModel.addLink(state, payload))
      : isLockedInfo(state),
  [actions.viewModelViewActivate.toString()]: (state, payload) =>
    viewModel.updateCurrentView(
      presentations.updateStepView(
        viewModel.activateView(state, payload),
        payload
      )
    ),
  [actions.viewModelViewUpdate.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateView(state, payload)
      : isLockedInfo(state),
  [actions.viewModelNodeUpdate.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(viewModel.updateNode(state, payload))
      : isLockedInfo(state),
  [actions.viewModelNodeRemove.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(viewModel.removeNode(state, payload))
      : isLockedInfo(state),
  [actions.viewModelViewAlignmentUpdate.toString()]: (state, payload) =>
    presentations.updateStepAlignment(
      !isLocked(state) ? viewModel.viewAlignmentUpdate(state, payload) : state,
      payload
    ),
  [actions.viewModelLayoutAlign.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.alignLayout(state, payload)
      : isLockedInfo(state),
  [actions.viewModelNodeCollapse.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.alignChildren(
          viewModel.updateCurrentView(viewModel.collapseNode(state, payload)),
          payload,
          state.viewModel.views[state.viewModel.current].nodes[payload.id]
            .dimension
        )
      : isLockedInfo(state),
  [actions.viewModelNodeExpand.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.alignChildren(
          viewModel.updateCurrentView(viewModel.expandNode(state, payload)),
          payload,
          state.viewModel.views[state.viewModel.current].nodes[payload.id]
            .dimension
        )
      : isLockedInfo(state),
  [actions.viewModelItemSelectionChanged.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(
          common.editItem(
            viewModel.itemSelectionChanged(state, payload),
            payload
          )
        )
      : isLockedInfo(state),
  [actions.modelObjectDetach.toString()]: (state, payload) =>
    !isLocked(state)
      ? viewModel.updateCurrentView(model.objectDetach(state, payload))
      : isLockedInfo(state),
  [actions.notificationAdd.toString()]: notifications.addNotification,
  [actions.notificationRemove.toString()]: notifications.removeNotifcation,
  [actions.loadStateStorage.toString()]: loadState,
  [actions.stateLoad.toString()]: loadState,
  [actions.setWindowDimensions.toString()]: layout.setWindowDimensions,
  [actions.layoutWidgetRestore.toString()]: layout.performRestore,
  [actions.layoutModeChange.toString()]: (state, payload) =>
    payload.mode === LAYOUT_MODE.SHOW
      ? presentations.goToStep(layout.setMode(state, payload), {
          stepIndex: 0,
          presentationId: state.presentationModel.current,
        })
      : layout.setMode(state, payload),
  [actions.presentationSelect.toString()]: presentations.select,
  [actions.presentationCreate.toString()]: presentations.create,
  [actions.presentationUpdateName.toString()]: presentations.updateName,
  [actions.presentationRemove.toString()]: presentations.remove,
  [actions.presentationSetGoTo.toString()]: (state, payload) => {
    const presentation =
      state.presentationModel.presentations[payload.presentationId];
    const step = presentation.steps[payload.stepIndex];
    return history.jumpById(
      viewModel.updateCurrentView(
        viewModel.viewAlignmentUpdate(
          viewModel.activateView(presentations.goToStep(state, payload), {
            id: step.properties.view,
          }),
          step.properties.alignment
        ),
        step.properties.alignment
      ),
      { id: step.properties.historyStepId }
    );
  },
  [actions.presentationStepAppend.toString()]: presentations.appendStep,
  [actions.presentationStepRemove.toString()]: presentations.removeStep,
  [actions.historyUndo.toString()]: (state, payload) =>
    viewModel.fixBrokenView(
      presentations.updateStepHistory(history.undo(state, payload))
    ),
  [actions.historyRedo.toString()]: (state, payload) =>
    viewModel.fixBrokenView(
      presentations.updateStepHistory(history.redo(state, payload))
    ),
  [actions.historyJump.toString()]: (state, payload) =>
    viewModel.fixBrokenView(
      presentations.updateStepHistory(history.jump(state, payload))
    ),
  [actions.historyLock.toString()]: (state, payload) => {
    const extendedPayload = {
      id: state.common.sandbox.data.properties.id.default,
      type:
        state.common.sandbox.data.title === 'Relation' ? 'relation' : 'object',
      isSelected: false,
    };
    return history.merge(
      viewModel.updateCurrentView(
        common.editItem(
          viewModel.itemSelectionChanged(state, extendedPayload),
          extendedPayload
        )
      ),
      payload
    );
  },
  [actions.historyChangeName.toString()]: history.changeName,
  [actions.undo.toString()]: undo.undo,
  [actions.redo.toString()]: undo.redo,
  [actions.historyRollback.toString()]: history.rollback,
};

export default handlersMap;
