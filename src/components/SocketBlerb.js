import React from 'react';
import { Image, Segment } from 'semantic-ui-react';

const SocketBlerb = () =>
  <Segment padded>
    <Image fluid
      src='/socket.io.svg'
      target='_blank' href='https://socket.io' />
    <p style={{ fontSize: '20px', textAlign: 'left' }}>
      Socket.IO allows Tutors to recieve instant notifications about
      Learner appointment proposals.  This two way communication library
      is the backbone of our notification system.
    </p>
  </Segment>
;

export default SocketBlerb;
