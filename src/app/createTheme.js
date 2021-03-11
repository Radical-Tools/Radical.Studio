import { grey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core';

const createTheme = (type) =>
  createMuiTheme({
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
            minWidth: '1024px',
            minHeight: '768px',
          },
        },
      },
    },
  });
export default createTheme;
