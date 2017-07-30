import { API_BASE } from '~/config';
import { screenResponse } from '~/util';


export default user =>
  fetch(`${API_BASE}/appointment`, {
    method: 'GET',
    headers: {
      authorization: user.token,
    },
  })
    .then(screenResponse)
    .then(res => res.json())
;
