import React from 'react';
import io from 'socket.io-client';
import { push } from 'react-router-redux';
import { Label, Icon } from 'semantic-ui-react';

import {
  socketConnect,
  socketDisconnect,
  socketAuth,
  socketDeauth,
} from '~/actions';
import { toast } from '~/util';
import { API_BASE } from '~/config';


const socket = io(API_BASE);

export const connectSocket = store => {
// Keep redux store in sink with socket state.
  socket.on('connect', () => {
    store.dispatch(socketConnect());
  });

  socket.on('disconnect', () => {
    store.dispatch(socketDisconnect());
  });

  let prevUserToken;
  store.subscribe(() => {
    const { user: { token } } = store.getState();

    if (prevUserToken !== token) {
      prevUserToken = token;

      socket.emit('auth', socket.id, token, (error, res) => {
        if (error)
          store.dispatch(socketDeauth());
        else
          store.dispatch(socketAuth());
      });
    }
  });

  socket.on('proposal', appointment => {
    toast(<h5><Label horizontal><Icon name='student' />{appointment.learner.username}</Label> has Proposed an appointment.</h5>, {
      onCloseButtonClick: () => store.dispatch(push(`/appointment/${appointment._id}`)),
      closeButtonContent: 'See More',
      closeButtonIcon: 'right arrow',
      type: 'info',
    });
  });
};

export default socket;
