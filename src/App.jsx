import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import createTheme from './app/createTheme';
import MainLayoutContainer from './view/components/layout/MainLayoutContainer';
import NotificationsDisplayHandlerContainer from './view/components/layout/NotificationsDisplayHandlerContainer';

const App = () => {
  const themeType = useSelector((state) => state.theme.current);
  const theme = createTheme(themeType);

  return (
    <DndProvider backend={HTML5Backend}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationsDisplayHandlerContainer />
        <MainLayoutContainer />
      </MuiThemeProvider>
    </DndProvider>
  );
};

export default App;
