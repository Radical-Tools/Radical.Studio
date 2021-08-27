import { createTheme } from '@material-ui/core';
import { LAYOUT_COLOR, MIN_HEIGHT, MIN_WIDTH } from './consts';

const createAppTheme = (type) =>
  createTheme({
    palette: {
      type,
      secondary: {
        main: LAYOUT_COLOR.SECONDARY,
      },
      primary: {
        main: LAYOUT_COLOR.PRIMARY,
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            minWidth: MIN_WIDTH,
            minHeight: MIN_HEIGHT,
          },
        },
      },
    },
    app: {
      minWidth: MIN_WIDTH,
      minHeight: MIN_HEIGHT,
    },
  });
export default createAppTheme;
