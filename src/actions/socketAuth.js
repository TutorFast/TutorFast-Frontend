import { SET_SOCKET } from '~/reducers/socket';

export default () => ({ type: SET_SOCKET, socket: { connected: true, authed: true } });
