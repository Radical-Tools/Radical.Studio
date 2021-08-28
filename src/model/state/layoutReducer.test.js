import { themeChanged } from './action-creators';

import { rootReducer, initialState } from './rootReducer';
import { THEME_DARK, THEME_LIGHT } from '../../common/consts';

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
