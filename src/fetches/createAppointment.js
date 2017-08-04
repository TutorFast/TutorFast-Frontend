import { API_BASE } from '~/config';
import { screenResponse } from '~/util';


export default (
  token: string, 
  appt: {
    tutor: string,
    startDate: Date,
    endDate: Date,
    location: string,
    subject: string,
  }
) =>
  fetch(`${API_BASE}/appointment`, {
    method: 'POST',
    headers: {
      authorization: token,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      tutor: appt.tutor,
      startDate: appt.startDate,
      endDate: appt.endDate,
      location: appt.location,
      subject: appt.subject,
    }),
  })
    .then(screenResponse)
    .then(res => res.json())
    .then(({ appointment }) => appointment)
;
