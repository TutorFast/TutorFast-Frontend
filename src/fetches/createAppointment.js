import { API_BASE } from '~/config';
import { screenResponse } from '~/util';

export default ({ appointment, token }) =>
  fetch(
    `${API_BASE}/appointment`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify(appointment),
    },
  )
    .then(screenResponse)
    .then(res => res.json())
;
