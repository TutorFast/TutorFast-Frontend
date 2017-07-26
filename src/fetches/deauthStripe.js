import { API_BASE } from '~/config';
import { screenResponse } from '~/util';

export default ({ token }) =>
  fetch(
    `${API_BASE}/stripe/account`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: token,
      },
    },
  )
    .then(screenResponse)
    .then(res => res.json())
;
