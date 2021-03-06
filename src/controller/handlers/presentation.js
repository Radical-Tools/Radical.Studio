import set from 'lodash/fp/set';
import unset from 'lodash/fp/unset';
import has from 'lodash/fp/has';
import cloneDeep from 'lodash/fp/cloneDeep';
import flow from 'lodash/fp/flow';
import identity from 'lodash/fp/identity';
import slice from 'lodash/fp/slice';
import concat from 'lodash/fp/concat';
import update from 'lodash/fp/update';
import { LAYOUT_MODE } from '../../app/consts';

export const initialState = {
  presentationModel: {
    current: undefined,
    presentations: {},
  },
};

export const select = (state, payload) =>
  has(payload.presentationId, state.project.presentationModel.presentations)
    ? set(
        ['project', 'presentationModel', 'current'],
        payload.presentationId,
        state
      )
    : state;

export const goToStep = (state, payload) =>
  payload.stepIndex <
  state.project.presentationModel.presentations[payload.presentationId].steps
    .length
    ? set(
        [
          'project',
          'presentationModel',
          'presentations',
          payload.presentationId,
          'currentStepIndex',
        ],
        payload.stepIndex,
        state
      )
    : state;

export const deselect = (state) =>
  unset(['project', 'presentationModel', 'current'], state);

export const create = (state, payload) =>
  !has(payload.id, state.project.presentationModel.presentations)
    ? flow(
        set(['project', 'presentationModel', 'presentations', payload.id], {
          name: payload.name,
          currentStepIndex: 0,
          steps: [
            {
              id: payload.id,
              name: `Start`,
              properties: {
                view: state.project.viewModel.current
                  ? state.project.viewModel.current
                  : undefined,
                alignment: state.project.viewModel.current
                  ? state.project.viewModel.views[
                      state.project.viewModel.current
                    ].alignment
                  : undefined,
                historyStepId:
                  state.project.history.prev.length > 0
                    ? state.project.history.prev[0].id
                    : 'initial',
              },
            },
          ],
        }),
        set(['project', 'presentationModel', 'current'], payload.id)
      )(state)
    : state;

export const updateName = (state, payload) =>
  has(payload.id, state.project.presentationModel.presentations)
    ? set(
        ['project', 'presentationModel', 'presentations', payload.id, 'name'],
        payload.name,
        state
      )
    : state;

export const remove = (state, payload) =>
  flow(
    unset(['project', 'presentationModel', 'presentations', payload.id]),
    state.project.presentationModel.current === payload.id &&
      Object.keys(state.project.presentationModel.presentations).length === 1
      ? unset(['project', 'presentationModel', 'current'])
      : identity,
    state.project.presentationModel.current === payload.id &&
      Object.keys(state.project.presentationModel.presentations).length > 1
      ? set(
          ['project', 'presentationModel', 'current'],
          Object.keys(state.project.presentationModel.presentations).filter(
            (id) => id !== payload.id
          )[0]
        )
      : identity
  )(state);

export const appendStep = (state, payload) =>
  flow(
    update(
      ['project', 'presentationModel', 'presentations', payload.presentationId],
      (presentation) => ({
        ...presentation,
        steps: concat(
          slice(0, presentation.currentStepIndex + 1, presentation.steps),
          [
            {
              id: payload.stepId,
              name: `Step`,
              properties: {
                view: presentation.steps[presentation.currentStepIndex]
                  .properties.view,
                alignment:
                  presentation.steps[presentation.currentStepIndex].properties
                    .alignment,
                viewModel:
                  state.project.viewModel.views[
                    state.project.viewModel.current
                  ],
                historyStepId:
                  state.project.history.prev.length > 0
                    ? state.project.history.prev[0].id
                    : 'initial',
              },
            },
            ...slice(
              presentation.currentStepIndex + 1,
              presentation.steps.length,
              presentation.steps
            ),
          ]
        ),
      })
    ),
    update(
      [
        'project',
        'presentationModel',
        'presentations',
        payload.presentationId,
        'currentStepIndex',
      ],
      (currentStepIndex) => currentStepIndex + 1
    )
  )(state);

export const removeStep = (state, payload) => {
  if (
    state.project.presentationModel.presentations[payload.presentationId] &&
    state.project.presentationModel.presentations[payload.presentationId].steps
      .length > 1
  ) {
    const newState = cloneDeep(state);
    newState.project.presentationModel.presentations[
      payload.presentationId
    ].steps.splice(payload.stepIndex, 1);
    newState.project.presentationModel.presentations[
      payload.presentationId
    ].currentStepIndex =
      payload.stepIndex > 0 ? payload.stepIndex - 1 : payload.stepIndex;
    return newState;
  }
  return state;
};

export const updateStepAlignment = (state, payload) =>
  state.layout.mode === LAYOUT_MODE.PRESENTATION &&
  state.project.presentationModel.current
    ? set(
        [
          'project',
          'presentationModel',
          'presentations',
          state.project.presentationModel.current,
          'steps',
          state.project.presentationModel.presentations[
            state.project.presentationModel.current
          ].currentStepIndex,
          'properties',
          'alignment',
        ],
        {
          offsetX: payload.offsetX,
          offsetY: payload.offsetY,
          zoom: payload.zoom,
        },
        state
      )
    : state;

export const updateStepView = (state, payload) =>
  state.layout.mode === LAYOUT_MODE.PRESENTATION &&
  state.project.presentationModel.current
    ? set(
        [
          'project',
          'presentationModel',
          'presentations',
          state.project.presentationModel.current,
          'steps',
          state.project.presentationModel.presentations[
            state.project.presentationModel.current
          ].currentStepIndex,
          'properties',
          'view',
        ],
        payload.id,
        state
      )
    : state;

export const updateStepHistory = (state) =>
  state.layout.mode === LAYOUT_MODE.PRESENTATION &&
  state.project.presentationModel.current
    ? set(
        [
          'project',
          'presentationModel',
          'presentations',
          state.project.presentationModel.current,
          'steps',
          state.project.presentationModel.presentations[
            state.project.presentationModel.current
          ].currentStepIndex,
          'properties',
          'historyStepId',
        ],
        state.project.history.prev.length > 0
          ? state.project.history.prev[0].id
          : 'initial',
        state
      )
    : state;
