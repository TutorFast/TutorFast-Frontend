import React, { Component } from 'react';
import { Elements, CardElement, injectStripe } from 'react-stripe-elements';
import { Form } from 'semantic-ui-react';

class PaymentForm extends Component {
  state = {
    card: {},
  }

  handleSubmit = () => {
    this.props.stripe.createToken({ type: 'card', name: 'Jenny Rosen' }).then(console.log);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <CardElement />
        <Form.Button content='Submit' />
      </Form>
    );
  }
}


const InjectedPaymentForm = injectStripe(PaymentForm);

export default (...props) =>
  <Elements>
    <InjectedPaymentForm {...props} />
  </Elements>
;
