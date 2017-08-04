import { API_BASE } from '~/config';
import { screenResponse } from '~/util';

export default ({ token, userid }) =>
  fetch(
    `${API_BASE}/user/${userid}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: token,
      },
    },
  )
    .then(screenResponse)
    .then(res => res.json())
    .then(({ user }) => user)
;
