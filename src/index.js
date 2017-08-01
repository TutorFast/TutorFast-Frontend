import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Context, { createContextConfig } from '~/containers/Context';
import App from '~/containers/App';
import { getOwnUser } from '~/fetches';
import {
  updateUser,
  signOut,
} from '~/actions';
import socket, { connectSocket } from '~/socket';


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

connectSocket(contextConfig.store);

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

socket.on('connect', () => {
  render(App);
});

if (module.hot)
  module.hot.accept('./containers/App', () => render(App));
