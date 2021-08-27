import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';
import createTheme from './app/createTheme';
import { MAX_SNACKS } from './app/consts';
import MainLayoutContainer from './view/components/layout/MainLayoutContainer';
import ErrorBoundary from './app/ErrorBoundary';
import NotificationsDisplayHandlerContainer from './view/components/layout/NotificationsDisplayHandlerContainer';

const App = ({ themeType, onWindowResize }) => {
  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    onWindowResize({ width, height });
    function handleResize() {
      onWindowResize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  const theme = createTheme(themeType);

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={MAX_SNACKS}>
          <CssBaseline />
          <NotificationsDisplayHandlerContainer />
          <ErrorBoundary>
            <MainLayoutContainer />
          </ErrorBoundary>
        </SnackbarProvider>
      </ThemeProvider>
    </DndProvider>
  );
};

export default App;
App.propTypes = {
  onWindowResize: PropTypes.func.isRequired,
  themeType: PropTypes.string.isRequired,
};
