import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { approveAppointment } from '~/fetches';

import type User from '~/types/User';
import type Appointment from '~/types/Appointment';


class AcceptAppointmentButton extends Component {
  defaultProps = {
    onApproved: console.log,
    onError: console.log,
    disabled: false,
  }

  state = {
    loading: false,
  }

  props: {
    onApproved?: ({ appointment: Appointment, message: string }) => {},
    onError?: Error => {},
    appointmentId: string,
    disabled?: boolean,
    user: User,
  }


  handleClick = () => {
    this.setState({ loading: true });

    approveAppointment(this.props.user, this.props.appointmentId)
      .then(this.props.onApproved)
      .catch(this.onError)
      .then(() => this.setState({ loading: false }))
    ;
  }

  render() {
    return (
      <Button positive basic disabled={this.props.disabled}
        content='Approve'
        onClick={this.handleClick}
        loading={this.state.loading} />
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
)(AcceptAppointmentButton);
