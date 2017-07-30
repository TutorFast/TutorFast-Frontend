import { API_BASE } from '~/config';
import { screenResponse } from '~/util';


export default (user, appointmentId) =>
  fetch(`${API_BASE}/appointment/reject/${appointmentId}`, {
    method: 'POST',
    headers: {
      authorization: user.token,
      'content-type': 'application/json',
    },
  })
    .then(screenResponse)
    .then(res => res.json())
;
