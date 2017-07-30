import React from 'react';
import { Image, Segment } from 'semantic-ui-react';

const MailgunBlerb = () =>
  <Segment padded>
    <Image src='/Mailgun_Secondary.png' />
    <p style={{ fontSize: '20px', textAlign: 'left' }}>
      Mailgun is our email currier service.  If you get an email
      from TutorFast, it's been delivered by Mailgun.
    </p>
  </Segment>
;

export default MailgunBlerb;
