import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Segment, Label } from 'semantic-ui-react';

import type User from '~/types/User';
import { getAppointments } from '~/fetches';


class TutorAppointmentList extends Component {
  state = {
    loading: true,
    appointments: [],
    error: '',
  }

  componentWillMount() {
    getAppointments(this.props.user)
      .then(({ asTutor }) => this.setState({ appointments: [...asTutor] }))
      .catch(error => this.setState({ error: error.toString() }))
      .then(() => this.setState({ loading: false }))
    ;
  }

  props: {
    user: User,
  }

  readify = (start, end) =>
    `On ${
      new Date(start).toLocaleDateString()
    } from ${
      new Date(start).toLocaleTimeString()
    } to ${new Date(end).toLocaleTimeString()}`

  stateToColor = state =>
    state === 'approved'
      ? 'green'
      : state === 'proposed'
        ? 'yellow'
        : state === 'rejected'
          ? 'orange'
          : 'red'

  renderItem = ({ startDate, endDate, location, state }) =>
    <List.Item>
      <List.Header>{location}</List.Header>
      <Label color={this.stateToColor(state)}>{state}</Label>
      <List.Content>
        {`${this.readify(startDate, endDate)}`}
      </List.Content>
    </List.Item>

  render() {
    return (
      <Segment loading={this.state.loading} color={this.state.error ? 'orange' : null}>
        <List divided relaxed>{do {
          if (this.state.error)
            this.state.error;
          else if (this.state.appointments.length)
            this.state.appointments.map(this.renderItem);
          else
            'You have no appointments.';
        }}</List>
      </Segment>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
)(TutorAppointmentList);
