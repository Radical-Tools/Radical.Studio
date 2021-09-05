/* eslint-disable no-console */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';
import createTheme from './createAppTheme';
import { MAX_SNACKS } from './consts';
import MainLayoutContainer from '../view/layout/MainLayoutContainer';
import ErrorBoundary from './ErrorBoundary';
import NotificationsDisplayHandlerContainer from '../view/layout/NotificationsDisplayHandlerContainer';

const App = ({ themeType, onWindowResize }) => {
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params);
    console.log(urlSearchParams.get('name'));
  }, []);
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
