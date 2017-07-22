import React, { Component } from 'react';
import { Elements, CardElement, injectStripe } from 'react-stripe-elements';
import { Form, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { setCard } from '~/fetches';


class PaymentForm extends Component {
  defaultProps = {
    onSubmit: () => console.log('default submit called'),
  }

  state = {
    loading: false,
    error: '',
  }

  props: {
    stripe: {
      createToken: Function
    },
    user: {
      token: string,
    },
    onSubmit?: () => null,
  }

  handleSubmit = () => {
    this.setState({ loading: true });

    try {
      this.props.stripe.createToken()
        .then(res => res.error ? Promise.reject(res.error) : res.token)
        .then(token => setCard({ cardToken: token.id, token: this.props.user.token }))
        .then(this.props.onSubmit)
        .catch(error => this.setState({ error }))
        .then(() => this.setState({ loading: false }))
      ;
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div>
        <Form loading={this.state.loading} onSubmit={this.handleSubmit} style={{ margin: 0 }}>
          <Form.Group style={{ display: 'flex', margin: 0 }}>
            <div style={{ flex: 1, margin: 'auto' }}>
              <CardElement style={{ base: { fontSize: '16px' } }} />
            </div>
            <Form.Button positive content='Submit' />
          </Form.Group>
        </Form>
        <Message error hidden={!this.state.error} style={{ margin: '5px 5px 0px -8px' }}>
          <Icon name='warning' />
          {this.state.error.toString()}
        </Message>
      </div>
    );
  }
}


const InjectedPaymentForm =
  injectStripe(connect(
    ({ user }) => ({ user }),
  )(PaymentForm));

export default props =>
  <Elements>
    <InjectedPaymentForm {...props} />
  </Elements>
;
