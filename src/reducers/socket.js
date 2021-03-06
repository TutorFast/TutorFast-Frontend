export const SET_SOCKET = 'SET_SOCKET';

export default (socket = { connected: false, authed: false }, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return { ...socket, ...action.socket };
    default:
      return socket;
  }
};
