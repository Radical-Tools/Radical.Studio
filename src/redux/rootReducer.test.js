import {
  modelObjectAdd,
  modelObjectRemove,
  themeChanged,
} from './action-creators';

import { rootReducer, initialState } from './rootReducer';
import { THEME_DARK, THEME_LIGHT } from '../app/consts';

describe('layout reducer', () => {
  it('should handle THEME_CHANGE', () => {
    expect(rootReducer(initialState, themeChanged()).theme.current).toEqual(
      THEME_DARK
    );
    expect(
      rootReducer(
        {
          theme: {
            current: THEME_DARK,
          },
        },
        themeChanged()
      ).theme.current
    ).toEqual(THEME_LIGHT);
  });
});

describe('model reducer', () => {
  it('should add object to model', () => {
    expect(
      rootReducer(initialState, modelObjectAdd('Actor', 'Actor', 'User')).model
        .objects
    ).toEqual({
      Actor: {
        id: 'Actor',
        name: 'User',
        type: 'Actor',
        attributes: {},
      },
    });
  });

  it('should ignore add the object with incorrect type', () => {
    expect(
      rootReducer(initialState, modelObjectAdd('Actor', 'Actor2', 'User')).model
        .objects
    ).toEqual({});
  });

  it('should remove object from model', () => {
    expect(
      rootReducer(
        {
          ...initialState,
          model: {
            ...initialState.model,
            objects: {
              ...initialState.model.objects,
              Actor: {
                id: 'Actor',
                name: 'User',
                type: 'Actor',
                attributes: {},
              },
              System: {
                id: 'System',
                name: 'Radical Tools',
                type: 'System',
                attributes: {},
              },
            },
          },
        },
        modelObjectRemove('Actor')
      ).model.objects
    ).toEqual({
      System: {
        id: 'System',
        name: 'Radical Tools',
        type: 'System',
        attributes: {},
      },
    });
  });

  it('should ignore remove request of nonexistent object', () => {
    expect(
      rootReducer(
        {
          ...initialState,
          model: {
            ...initialState.model,
            objects: {
              ...initialState.model.objects,
              System: {
                id: 'System',
                name: 'Radical Tools',
                type: 'System',
                attributes: {},
              },
            },
          },
        },
        modelObjectRemove('Actor')
      ).model.objects
    ).toEqual({
      System: {
        id: 'System',
        name: 'Radical Tools',
        type: 'System',
        attributes: {},
      },
    });
  });
});
