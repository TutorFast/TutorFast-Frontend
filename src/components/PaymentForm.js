import React, { Component } from 'react';
import { Elements, CardElement, injectStripe } from 'react-stripe-elements';
import { Form, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { setCard, unsetCard } from '~/fetches';
import { updateUser } from '~/actions';
import { pipe } from '~/util';

class PaymentForm extends Component {
  defaultProps = {
    onSubmit: () => console.log('default submit called'),
    onSubmit: () => console.log('default unset called'),
  }

  state = {
    loading: false,
    complete: false,
    error: '',
  }

  props: {
    stripe: {
      createToken: Function
    },
    user: {
      token: string,
      card: string,
    },
    onSubmit?: () => null,
    onUnset?: () => null,
    dispatch: Function,
  }

  handleSubmit = () => {
    this.setState({ loading: true });

    try {
      this.props.stripe.createToken()
        .then(res => res.error ? Promise.reject(res.error) : res.token)
        .then(token => setCard({ cardToken: token.id, token: this.props.user.token }))
        .then(pipe(({ user }) => this.props.dispatch(updateUser(user))))
        .then(this.props.onSubmit)
        .catch(error => this.setState({ error }))
        .then(() => this.setState({ loading: false }))
      ;
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  handleUnset = () => {
    this.setState({ loading: true });

    unsetCard({ token: this.props.user.token })
      .then(() => this.props.dispatch(updateUser({ card: '' })))
      .then(this.props.onUnset)
      .catch(error => this.setState({ error }))
      .then(() => this.setState({ loading: false }))
    ;
  }

  handleChange = ({ complete }) => {
    this.setState({ complete });
  }

  render() {
    return (
      <div>
        <Form loading={this.state.loading} style={{ margin: 0 }}>
          <Form.Group style={{ display: 'flex', margin: 0 }}>
            <div style={{ flex: 1, margin: 'auto' }}>
              <CardElement style={{ base: { fontSize: '16px' } }} onChange={this.handleChange} />
            </div>
            <Form.Button
              positive
              disabled={!this.state.complete}
              onClick={this.handleSubmit}
              content={this.props.user.card ? 'Reset' : 'Set'} />
            {this.props.user.card
              ? <Form.Button negative content='Unset' onClick={this.handleUnset} />
              : null
            }
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
