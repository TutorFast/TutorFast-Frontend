import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Calendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';


import { getUser } from '~/fetches';
import type User from '~/types/User';


Calendar.momentLocalizer(moment);

class CreateAppointmentView extends Component {
  state = {
    loading: null,
    tutor: null,
    events: [],
  }

  componentWillMount() {
    this.loadTutor();
  }

  componentWillReceiveProps() {
    this.loadTutor();
  }

  props: {
    learner: User,
    tutorId: string,
  }

  loadTutor = () =>
    this.setState(state => state.loading ? {} :
      {
        loading: getUser(this.props.learner.token, this.props.tutorId)
          .then(({ user }) => this.setState({ tutor: user, loading: null }))
          .catch(console.log),
      }
    )

  handleSelecting = ({ start, end }) => start >= Date.now()
  handleSelectSlot = event => event.start >= Date.now() && this.setState({ events: [event] })

  render() {
    console.log(this.state.events)
    return (
      <Segment loading={Boolean(this.state.loading)}>
        <Calendar selectable
          defaultDate={new Date(Date.now())}
          defaultView={'week'}
          views={['week']}
          events={this.state.events}
          onSelecting={this.handleSelecting}
          onSelectSlot={this.handleSelectSlot} />
        {this.props.tutorId}
        {this.state.tutor && JSON.stringify(this.state.tutor)}
        {this.props.learner && JSON.stringify(this.props.learner)}
      </Segment>
    );
  }
}

export default connect(
  ({ user }, { match }) => ({ learner: user, tutorId: match.params.tutorId }),
)(CreateAppointmentView);
