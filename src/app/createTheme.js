import { grey } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core';
import { MIN_HEIGHT, MIN_WIDTH } from './consts';

const createAppTheme = (type) =>
  createTheme({
    palette: {
      type,
      secondary: {
        main: grey[400],
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
