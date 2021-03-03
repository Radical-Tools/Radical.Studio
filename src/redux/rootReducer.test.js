import { themeChanged } from './action-creators';
import initialState from './initialState';
import reducer from './rootReducer';

describe('theme reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle THEME_CHANGE', () => {
    expect(reducer(initialState, themeChanged())).toEqual({
      theme: {
        current: 'dark',
      },
    });

    expect(
      reducer(
        {
          theme: {
            current: 'dark',
          },
        },
        themeChanged()
      )
    ).toEqual({
      theme: {
        current: 'light',
      },
    });
  });
});
