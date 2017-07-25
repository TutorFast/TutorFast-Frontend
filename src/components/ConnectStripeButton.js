import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { STRIPE_CLIENT_ID, STRIPE_OAUTH_URL } from '~/config';
import { deauthStripe } from '~/fetches';
import { updateUser } from '~/actions';


class ConnectStripeButton extends Component {
  state = {
    loading: false,
    error: '',
  }

  props: {
    user: {},
    dispatch: Function,
  }

  handleRevoke = () => {
    this.setState({ loading: true });

    deauthStripe(this.props.user)
      .then(({ user }) => this.props.dispatch(updateUser(user)))
      .catch(error => this.setState({ error }))
      .then(() => this.setState({ loading: false }))
    ;
  }

  render() {
    const user = this.props.user;

    return user.account
      ? <Button
        content='Revoke'
        loading={this.state.loading}
        negative={Boolean(this.state.error)}
        onClick={this.handleRevoke}/>
      : <Button as='a' content='Connect' positive
        href={
          `${
            STRIPE_OAUTH_URL
          }?response_type=code&client_id=${
            STRIPE_CLIENT_ID
          }&scope=read_write&state=${
            user.token
          }`
        } />;
  }
}

export default connect(
  ({ user }) => ({ user }),
)(ConnectStripeButton);
