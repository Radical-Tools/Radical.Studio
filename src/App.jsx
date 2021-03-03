import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';

import MainLayout from './view/components/layout/MainLayout';
import createTheme from './app/createTheme';

const App = () => {
  const themeType = useSelector((state) => state.theme.current);
  const theme = createTheme(themeType);

  return (
    <DndProvider backend={HTML5Backend}>
      <MuiThemeProvider theme={theme}>
        <MainLayout />
      </MuiThemeProvider>
    </DndProvider>
  );
};

export default App;
