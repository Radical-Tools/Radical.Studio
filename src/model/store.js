import { configureStore } from '@reduxjs/toolkit';
import * as signalR from '@microsoft/signalr';
import historyReducer from './historyReducer';
import rootReducer from './rootReducer';
import subscribeToStoreChanges from '../controller/handlers/localStorage';
import undoReducer from './undoReducer';
import * as actions from '../controller/actions/actionCreators';

const skipActions = [
  actions.loadStateStorage.toString(),
  actions.stateLoad.toString(),
  actions.undo.toString(),
  actions.redo.toString(),
  actions.layoutDrawerToggle.toString(),
  actions.layoutAdminDialogToggle.toString(),
  actions.layoutSet.toString(),
  actions.viewModelItemSelectionChanged.toString(),
  actions.setWindowDimensions.toString(),
];

const connection = new signalR.HubConnectionBuilder()
.withUrl("https://localhost:7059/chathub")
.configureLogging(signalR.LogLevel.Information)
.build();

async function start(storeValue) {
  try {
    if(connection.state !== 'Connected') {
      await connection.start();
    }         
    await await connection.invoke("SendMessage", "id", JSON.stringify(storeValue.getState().project));

  } catch (err) {
      console.log(err);
      setTimeout(start, 5000);
  }
};

const store = configureStore({
  reducer: undoReducer(historyReducer(rootReducer)),
  devTools: {
    name: 'Studio.Radical.Tools',
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    (storeValue) => (next) => (action) => {
      const result = next(action);

      if (skipActions.includes(action.type) === false) {
        console.log("dupa");
        start(storeValue);
      }

      return result;
    },
  ],
});

subscribeToStoreChanges(store, (state) => !state.layout.showHomeDialog);
export default store;
