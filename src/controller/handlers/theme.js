import { THEME_DARK, THEME_LIGHT } from '../../common/consts';

export const initialState = {
  theme: {
    current: THEME_LIGHT,
  },
};

export const changeTheme = (state) => ({
  ...state,
  theme: {
    current: state.theme.current === THEME_DARK ? THEME_LIGHT : THEME_DARK,
  },
});
