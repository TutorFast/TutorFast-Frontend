import { API_BASE } from '~/config';
import { screenResponse } from '~/util';
import withQuery from 'with-query';

export default
(
  {
    username,
    subjects,
    minWage,
    maxWage,
    zipCode,
    } : {
    username: string,
    subjects: [string],
    minWage: number,
    maxWage: number,
    zipCode: string
  }
) : Promise<Array<string>> =>
  fetch(
    withQuery(`${API_BASE}/tutor`, {
      username,
      subjects,
      minWage,
      maxWage,
      zipCode,
    }),
    {
      method: 'GET',
    },
  )
    .then(screenResponse)
    .then(res => res.json())
    .then(({ tutors }) => tutors)
;
