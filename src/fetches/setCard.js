import { API_BASE } from '~/config';
import { screenResponse } from '~/util';

export default ({ cardToken, token }) =>
  fetch(
    `${API_BASE}/user/card`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({ cardToken }),
    },
  )
    .then(screenResponse)
    .then(res => res.json())
;
