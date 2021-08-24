import set from 'lodash/fp/set';
import unset from 'lodash/fp/unset';
import has from 'lodash/fp/has';
import cloneDeep from 'lodash/fp/cloneDeep';
import flow from 'lodash/fp/flow';
import identity from 'lodash/fp/identity';
import slice from 'lodash/fp/slice';
import concat from 'lodash/fp/concat';

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
  set(
    [
      'presentationModel',
      'presentations',
      payload.presentationId,
      'currentStepIndex',
    ],
    payload.stepIndex,
    state
  );

export const deselect = (state) =>
  unset(['presentationModel', 'current'], state);

export const create = (state, payload) =>
  flow(
    set(['presentationModel', 'presentations', payload.id], {
      name: payload.name,
      currentStepIndex: 0,
      steps: [
        {
          name: `Start`,
          properties: {
            view: state.viewModel.current,
            alignment: state.viewModel.views[state.viewModel.current].alignment,
          },
        },
      ],
    }),
    set(['presentationModel', 'current'], payload.id)
  )(state);

export const updateName = (state, payload) =>
  set(
    ['presentationModel', 'presentations', payload.id, 'name'],
    payload.name,
    state
  );

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

export const appendStep = (state, payload) => {
  const newState = cloneDeep(state);
  const presentation =
    newState.presentationModel.presentations[payload.presentationId];
  const currentStep = presentation.steps[presentation.currentStepIndex];

  presentation.steps = concat(
    slice(0, presentation.currentStepIndex + 1, presentation.steps),
    [
      {
        name: `Step`,
        properties: {
          view: currentStep.properties.view,
          alignment: currentStep.properties.alignment,
        },
      },
      ...slice(
        presentation.currentStepIndex + 1,
        presentation.steps.length,
        presentation.steps
      ),
    ]
  );

  presentation.currentStepIndex += 1;

  return newState;
};

export const removeStep = (state, payload) => {
  const newState = cloneDeep(state);
  const presentation =
    newState.presentationModel.presentations[payload.presentationId];

  if (presentation.steps.length > 1) {
    presentation.steps.splice(payload.stepIndex, 1);
    presentation.currentStepIndex =
      payload.stepIndex > 0 ? payload.stepIndex - 1 : payload.stepIndex;
  }
  return newState;
};

export const updateStepAlignment = (state, payload) =>
  state.layout.mode === 'presentation' && state.presentationModel.current
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
  state.layout.mode === 'presentation' && state.presentationModel.current
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
