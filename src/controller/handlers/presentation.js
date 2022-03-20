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
  has(payload.presentationId, state.presentationModel.presentations)
    ? set(['presentationModel', 'current'], payload.presentationId, state)
    : state;

export const goToStep = (state, payload) =>
  payload.stepIndex <
  state.presentationModel.presentations[payload.presentationId].steps.length
    ? set(
        [
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
  unset(['presentationModel', 'current'], state);

export const create = (state, payload) =>
  !has(payload.id, state.presentationModel.presentations)
    ? flow(
        set(['presentationModel', 'presentations', payload.id], {
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
                  state.history.prev.length > 0
                    ? state.history.prev[0].id
                    : 'initial',
              },
            },
          ],
        }),
        set(['presentationModel', 'current'], payload.id)
      )(state)
    : state;

export const updateName = (state, payload) =>
  has(payload.id, state.presentationModel.presentations)
    ? set(
        ['presentationModel', 'presentations', payload.id, 'name'],
        payload.name,
        state
      )
    : state;

export const remove = (state, payload) =>
  flow(
    unset(['presentationModel', 'presentations', payload.id]),
    state.presentationModel.current === payload.id &&
      Object.keys(state.presentationModel.presentations).length === 1
      ? unset(['presentationModel', 'current'])
      : identity,
    state.presentationModel.current === payload.id &&
      Object.keys(state.presentationModel.presentations).length > 1
      ? set(
          ['presentationModel', 'current'],
          Object.keys(state.presentationModel.presentations).filter(
            (id) => id !== payload.id
          )[0]
        )
      : identity
  )(state);

export const appendStep = (state, payload) =>
  flow(
    update(
      ['presentationModel', 'presentations', payload.presentationId],
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
                  state.history.prev.length > 0
                    ? state.history.prev[0].id
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
    state.presentationModel.presentations[payload.presentationId] &&
    state.presentationModel.presentations[payload.presentationId].steps.length >
      1
  ) {
    const newState = cloneDeep(state);
    newState.presentationModel.presentations[
      payload.presentationId
    ].steps.splice(payload.stepIndex, 1);
    newState.presentationModel.presentations[
      payload.presentationId
    ].currentStepIndex =
      payload.stepIndex > 0 ? payload.stepIndex - 1 : payload.stepIndex;
    return newState;
  }
  return state;
};

export const updateStepAlignment = (state, payload) =>
  state.layout.mode === LAYOUT_MODE.PRESENTATION &&
  state.presentationModel.current
    ? set(
        [
          'presentationModel',
          'presentations',
          state.presentationModel.current,
          'steps',
          state.presentationModel.presentations[state.presentationModel.current]
            .currentStepIndex,
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
  state.presentationModel.current
    ? set(
        [
          'presentationModel',
          'presentations',
          state.presentationModel.current,
          'steps',
          state.presentationModel.presentations[state.presentationModel.current]
            .currentStepIndex,
          'properties',
          'view',
        ],
        payload.id,
        state
      )
    : state;

export const updateStepHistory = (state) =>
  state.layout.mode === LAYOUT_MODE.PRESENTATION &&
  state.presentationModel.current
    ? set(
        [
          'presentationModel',
          'presentations',
          state.presentationModel.current,
          'steps',
          state.presentationModel.presentations[state.presentationModel.current]
            .currentStepIndex,
          'properties',
          'historyStepId',
        ],
        state.history.prev.length > 0 ? state.history.prev[0].id : 'initial',
        state
      )
    : state;
