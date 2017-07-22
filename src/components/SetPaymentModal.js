import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Segment } from 'semantic-ui-react';
import { push } from 'react-router-redux';

import PaymentForm from './PaymentForm';


class SetPaymentModal extends Component {
  props: {
    user: {
      card: string,
    },
    dispatch: Function,
  }

  handleSubmit = () => {
    this.props.dispatch(push('/user'));
  }

  handleClose = () => {
    this.props.dispatch(push('/user'));
  }

  render() {
    return (
      <Modal open onClose={this.handleClose}>
        <Modal.Header>
          {
            this.props.user.card
              ? 'Update payment method.'
              : 'Set a payment method.'
          }
        </Modal.Header>

        <Modal.Content>
          <Segment color='green' style={{ padding: '10px 10px 10px 18px' }}>
            <PaymentForm onSubmit={this.handleSubmit} />
          </ Segment>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
)(SetPaymentModal);
