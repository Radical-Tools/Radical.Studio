import * as signalR from '@microsoft/signalr';
import { v4 as uuidv4 } from 'uuid';

export const initialState = {
  connection: {
    connectionId: '',
  },
};

export const setConnectionId = (state) => ({
  ...state,
  connection: {
    connectionId:
      state.connection.connectionId === ''
        ? uuidv4()
        : state.connection.connectionId,
  },
});

export const send = async (connection, id, message) => {
  try {
    console.log(`try sending :${message}`);
    await connection.invoke('SendMessage', id, message);
  } catch (err) {
    console.error(err);
  }
};
export const cooperate = () => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7059/chathub')
    .configureLogging(signalR.LogLevel.Information)
    .build();

  async function start() {
    try {
      await connection.start();
      connection.on('ReceiveMessage', (user, message) => {
        console.log(`SinglR: User: ${user} Messege: ${message}`);

        const event = new CustomEvent('message', {
          detail: { message },
        });
        window.dispatchEvent(event);
      });
    } catch (err) {
      console.log(err);
      setTimeout(start, 5000);
    }
  }

  start();

  connection.onclose(async () => {
    await start();
  });
};

export default cooperate;
