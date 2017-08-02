import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { rejectAppointment } from '~/fetches';

import type User from '~/types/User';
import type Appointment from '~/types/Appointment';


class RejectAppointmentButton extends Component {
  defaultProps = {
    onRejected: console.log,
    onError: console.log,
    disabled: false,
  }

  state = {
    loading: false,
  }

  props: {
    onRejected?: Appointment => {},
    onError?: Error => {},
    appointmentId: string,
    disabled?: boolean,
    user: User,
  }


  handleClick = () => {
    this.setState({ loading: true });

    rejectAppointment(this.props.user, this.props.appointmentId)
      .then(this.props.onRejected)
      .catch(this.onError)
      .then(() => this.setState({ loading: false }))
    ;
  }

  render() {
    return (
      <Button negative basic disabled={this.props.disabled}
        content='Reject'
        onClick={this.handleClick}
        loading={this.state.loading} />
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
)(RejectAppointmentButton);
