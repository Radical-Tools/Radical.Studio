import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { MAX_SNACKS } from './app/consts';

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={MAX_SNACKS}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
