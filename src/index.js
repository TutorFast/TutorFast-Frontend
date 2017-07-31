import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { AppContainer } from 'react-hot-loader';

import Context, { createContextConfig } from '~/containers/Context';
import { getOwnUser } from '~/fetches';
import {
  updateUser,
  signOut,
  socketConnect,
  socketDisconnect,
  socketAuth,
  socketDeauth,
} from '~/actions';
import socket from '~/socket';

let contextConfig;

try {
  contextConfig = createContextConfig({
    initialState: {
      user: JSON.parse(localStorage.getItem('user')) || {},
    },
  });
} catch (err) {
  contextConfig = createContextConfig();
}

getOwnUser(contextConfig.store.getState().user.token)
  .then(user => contextConfig.store.dispatch(updateUser(user)))
  .catch(() => contextConfig.store.dispatch(signOut()))
;

// Keep redux store in sink with socket state.
socket.on('connect', () => {
  contextConfig.store.dispatch(socketConnect());
});

socket.on('disconnect', () => {
  contextConfig.store.dispatch(socketDisconnect());
});

let prevUserToken;
contextConfig.store.subscribe(() => {
  const { user: { token } } = contextConfig.store.getState();

  if (prevUserToken !== token) {
    prevUserToken = token;

    socket.emit('auth', socket.id, token, (error, res) => {
      if (error) {
        console.log(error);
        contextConfig.store.dispatch(socketDeauth());
      }
      else {
        console.log(res);
        contextConfig.store.dispatch(socketAuth());
      }
    });
  }
});


const render = Component =>
  ReactDOM.render(
    <Context {...contextConfig}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Context>,
    document.getElementById('app')
  )
;

render(App);

if (module.hot)
  module.hot.accept('./containers/App', () => render(App));
