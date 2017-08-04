import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Segment, Container, Form, Input, Message } from 'semantic-ui-react';
import Calendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import { getUser, createAppointment } from '~/fetches';
import type User from '~/types/User';

import PriceLabel from '~/components/Label/PriceLabel';


Calendar.momentLocalizer(moment);

class CreateAppointmentView extends Component {
  state = {
    loading: null,
    submitting: false,
    tutor: null,
    events: [],
    error: null,
    location: '',
    subject: null,
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
    dispatch: Function,
  }

  loadTutor = () =>
    this.setState(state => state.loading ? {} :
      {
        loading: getUser(this.props.learner.token, this.props.tutorId)
          .then(({ user }) => this.setState({ tutor: user, loading: null }))
          .catch(console.log),
      }
    )

  valid = () => {
    if (!this.state.location) return false;

    if (!this.state.subject) return false;

    if (!this.state.events.length) return false;

    return true;
  }

  handleSelecting = ({ start }) => start >= Date.now()
  handleSelectSlot = event => event.start >= Date.now() && this.setState({ events: [event] })

  handleSubmit = () => {
    if (!this.valid()) return;

    this.setState({ submitting: true });

    createAppointment(this.props.learner.token, {
      startDate: this.state.events[0].start,
      endDate: this.state.events[0].end,
      location: this.state.location,
      subject: this.state.subject,
      tutor: this.props.tutorId,
    })
      .then(appt => this.props.dispatch(push(`/appointment/${appt._id}`)))
      .catch(error => this.setState({ submitting: false, error }))
    ;
  }

  handleChange = (_, { name, value }) => this.setState({ [name]: value })

  render() {
    console.log(this.state);
    return (
      <Container>
        <Segment loading={Boolean(this.state.loading)}>
          <Form onSubmit={this.handleSubmit}>

            <Form.Group widths='2'>
              <Form.Dropdown fluid selection
                name='subject'
                label='What do you want to know?'
                placeholder='Select Subject'
                onChange={this.handleChange}
                options={
                  this.state.tutor &&
                this.state.tutor.subjects.map(subject => ({ text: subject, value: subject }))}/>

              <Form.Input
                name='location'
                onChange={this.handleChange}
                label='Specify a Location'
                placeholder='Location' />
            </Form.Group>

            <Form.Field>
              <label>Choose a date and time.</label>
              <Calendar selectable toolbar={false}
                defaultDate={new Date(Date.now())}
                defaultView={'week'}
                views={['week', 'day']}
                events={this.state.events}
                onSelecting={this.handleSelecting}
                onSelectSlot={this.handleSelectSlot} />
            </Form.Field>

            <Form.Group inline>
              <Form.Button disabled={!this.valid()} primary type='submit'>Propose Appointment!</Form.Button>
              {
                !this.state.loading && this.state.events.length
                  ? <PriceLabel
                    size='large'
                    price={this.state.tutor.wage * (this.state.events[0].end - this.state.events[0].start) / 1000 / 60 / 60
                    } />
                  : null
              }
            </Form.Group>
          </Form>

          {this.state.error ?
            <Message negative>
              {this.state.error.toString()}
            </Message>
            : null}
        </Segment>
      </Container>
    );
  }
}

export default connect(
  ({ user }, { match }) => ({ learner: user, tutorId: match.params.tutorId }),
)(CreateAppointmentView);
