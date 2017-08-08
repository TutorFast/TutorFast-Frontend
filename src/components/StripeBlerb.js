import React from 'react';
import { Image, Segment } from 'semantic-ui-react';

const StripeBlerb = () =>
  <Segment padded>
    <Image fluid
      alt='Stripe'
      src='/stripe/Blue/Stripe Logo (blue).svg'
      target='_blank' href='https://stripe.com' />
    <p style={{ fontSize: '20px', textAlign: 'left' }}>
      This site proudly uses Stripe to preform monetary
      transactions between Learners and Tutors.  All
      sensitive billing information is stored on Stripe servers
      so you can rest easy knowing your credit card or account numbers
      are safe and sound.
    </p>
  </Segment>
;

export default StripeBlerb;
