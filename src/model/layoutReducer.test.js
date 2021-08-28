import { themeChanged } from '../controller/actions/actionCreators';

import rootReducer from './rootReducer';
import { THEME_DARK, THEME_LIGHT } from '../app/consts';
import initialState from './initialState';

describe('layout handling', () => {
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
