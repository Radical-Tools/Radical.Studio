import React from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import createTheme from './createAppTheme';
import { MAX_SNACKS } from './consts';
import MainLayoutContainer from '../view/layout/MainLayoutContainer';
import ErrorBoundary from './ErrorBoundary';
import NotificationsDisplayHandlerContainer from '../view/layout/NotificationsDisplayHandlerContainer';
import useProjectUrlLoad from '../controller/hooks/useProjectUrlLoad';
import useWindowResizeObserver from '../controller/hooks/useWindowResizeObserver';
import useGlobalKeyboardShortcuts from './useGlobalKeyboardShortcuts';

const App = ({
  themeType,
  onWindowResize,
  onLoadStateFromUrl,
  onAddNotification,
  undoCmd,
  redoCmd,
  onToggleAdminDialog,
}) => {
  const isLoadingProject = useProjectUrlLoad(
    onLoadStateFromUrl,
    onAddNotification
  );
  useWindowResizeObserver(onWindowResize);
  useGlobalKeyboardShortcuts(undoCmd, redoCmd, onToggleAdminDialog);

  const theme = createTheme(themeType);
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={MAX_SNACKS}>
          <CssBaseline />
          <NotificationsDisplayHandlerContainer />
          {isLoadingProject ? (
            <Backdrop open>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <ErrorBoundary>
              <MainLayoutContainer />
            </ErrorBoundary>
          )}
        </SnackbarProvider>
      </ThemeProvider>
    </DndProvider>
  );
};

export default App;
App.propTypes = {
  onWindowResize: PropTypes.func.isRequired,
  onLoadStateFromUrl: PropTypes.func.isRequired,
  onAddNotification: PropTypes.func.isRequired,
  undoCmd: PropTypes.func.isRequired,
  redoCmd: PropTypes.func.isRequired,
  onToggleAdminDialog: PropTypes.func.isRequired,
  themeType: PropTypes.string.isRequired,
};
