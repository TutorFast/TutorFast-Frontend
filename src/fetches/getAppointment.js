import { API_BASE } from '~/config';
import { screenResponse } from '~/util';


export default ({ user, appointmentId }) =>
  fetch(`${API_BASE}/appointment/${appointmentId}`, {
    method: 'GET',
    headers: {
      authorization: user.token,
    },
  })
    .then(screenResponse)
    .then(res => res.json())
    .then(({ appointment }) => appointment)
;
