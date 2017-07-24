import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { AppContainer } from 'react-hot-loader';

import Context, { createContextConfig } from '~/containers/Context';
import { getOwnUser } from '~/fetches';
import { updateUser, signOut } from '~/actions';

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
