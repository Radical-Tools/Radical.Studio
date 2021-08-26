import { createTheme } from '@material-ui/core';
import { MIN_HEIGHT, MIN_WIDTH } from './consts';

const createAppTheme = (type) =>
  createTheme({
    palette: {
      type,
      secondary: {
        main: '#fc8b0b',
      },
      primary: {
        main: '#4d4f62',
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
