import { THEME_DARK, THEME_LIGHT } from '../app/consts';
import { themeChanged } from './action-creators';
import initialState from './initialState';
import reducer from './rootReducer';

describe('root reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle THEME_CHANGE', () => {
    expect(reducer(initialState, themeChanged()).theme.current).toEqual(
      THEME_DARK
    );

    expect(
      reducer(
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
