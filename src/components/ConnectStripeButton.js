import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { STRIPE_CLIENT_ID, STRIPE_OAUTH_URL } from '~/config';


const ConnectStripeButton = ({ token } : { token: string }) =>
  <Button as='a' content='Connect to Stripe'
    href={
      `${
        STRIPE_OAUTH_URL
      }?response_type=code&client_id=${
        STRIPE_CLIENT_ID
      }&scope=read_write&state=${
        token
      }`
    } />;


export default connect(
  ({ user }) => ({ token: user.token }),
)(ConnectStripeButton);
