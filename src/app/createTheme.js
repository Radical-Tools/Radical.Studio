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
  });
export default createTheme;
