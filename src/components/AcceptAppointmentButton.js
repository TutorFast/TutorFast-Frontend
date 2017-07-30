import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { acceptAppointment } from '~/fetches';

import type User from '~/types/User';
import type Appointment from '~/types/Appointment';


class AcceptAppointmentButton extends Component {
  defaultProps = {
    onAccept: console.log,
    onError: console.log,
  }

  props: {
    onAccept?: Appointment => {},
    onError?: Error => {},
    appointment: string,
    user: User,
  }

  state = {
    loading: false,
  }

  handleClick = () => {
    this.setState({ loading: true });

    acceptAppointment(this.props.user, this.props.appointment)
      .then(this.props.onAccept)
      .catch(this.onError)
      .then(this.setState({ loading: false }))
    ;
  }

  render() {
    return (
      <Button success
        content='Accept Appointment'
        onClick={this.handleClick}
        loading={this.state.loading} />
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
)(AcceptAppointmentButton);
