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
  }

  state = {
    loading: false,
  }

  props: {
    onApproved?: Appointment => {},
    onError?: Error => {},
    appointmentId: string,
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
      <Button positive
        content='Approve Appointment'
        onClick={this.handleClick}
        loading={this.state.loading} />
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
)(AcceptAppointmentButton);
