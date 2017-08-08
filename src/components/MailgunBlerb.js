import React from 'react';
import { Image, Segment } from 'semantic-ui-react';

const MailgunBlerb = () =>
  <Segment padded>
    <Image fluid
      alt='Mailgun'
      src='/Mailgun_Secondary.png'
      href='https://www.mailgun.com' target='_blank'/>
    <p style={{ fontSize: '20px', textAlign: 'left' }}>
      Mailgun is our email currier service.  If you get an email
      from TutorFast, it's been delivered by Mailgun.
    </p>
  </Segment>
;

export default MailgunBlerb;
