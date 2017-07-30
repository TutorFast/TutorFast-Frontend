import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Segment, Label, Icon } from 'semantic-ui-react';

import type User from '~/types/User';

import { AcceptAppointmentButton } from './AcceptAppointmentButton';
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
    <div style={{ display: 'inline-block' }}>
      <Label color='violet'>
        <Icon name='calendar' />
        {new Date(start).toLocaleDateString()}
      </Label> from <Label color='blue' image>
        {new Date(start).toLocaleTimeString()}
        <Label.Detail>Start</Label.Detail>
      </Label> <Icon name='angle right' />
      <Label color='blue' image>
        {new Date(end).toLocaleTimeString()}
        <Label.Detail>End</Label.Detail>
      </Label>
    </div>

  stateToColor = state =>
    state === 'approved'
      ? 'green'
      : state === 'proposed'
        ? 'yellow'
        : state === 'rejected'
          ? 'orange'
          : 'red'


  stateToIcon = state =>
    state === 'approved'
      ? 'check'
      : state === 'proposed'
        ? 'question'
        : state === 'rejected'
          ? 'cancel'
          : 'red'

  renderItem = ({ startDate, endDate, location, state, cost, learner, tutor, subject, _id }, idx) =>
    <List.Item key={idx}>
      <List.Content floated='right'>
        {state === 'proposed'
          ? <AcceptAppointmentButton appointmentId={_id}/>
          : null}
      </List.Content>
      <List.Content style={{ marginBottom: '4px' }}>
        <Label color={this.stateToColor(state)}>
          <Icon name={this.stateToIcon(state)}/>
          {state}
        </Label>
        <Label>
          <Icon name='book'/>
          {tutor.username}
        </Label> teaches <Label color='pink'>
          <Icon name='idea'/>
          {subject}
        </Label> to <Label>
          <Icon name='student'/>
          {learner.username}
        </Label> for <Label tag color='olive'>
          {`$${cost.toFixed(2)}`}
        </Label>
      </List.Content>
      <List.Content>
        At <Label color='brown'>
          <Icon name='marker'/>
          {location}
        </Label> on {
          this.readify(startDate, endDate)
        }
      </List.Content>
    </List.Item>

  render() {
    return (
      <Segment loading={this.state.loading} color={this.state.error ? 'orange' : null}>
        <List divided relaxed selection>{do {
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
