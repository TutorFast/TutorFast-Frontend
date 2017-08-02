import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Container, Tab, Header } from 'semantic-ui-react';
import { push } from 'react-router-redux';

import { getAppointments } from '~/fetches';
import type User from '~/types/User';

import AppointmentCard from './AppointmentCard';


class AppointmentView extends Component {
  state = {
    loading: null,
    appts: {
      asTutor: [],
      asLearner: [],
    },
  }

  componentWillMount() {
    this.fetchAppts();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.isApptLoaded(nextProps.params.appointmentId))
      this.fetchAppts();
  }

  isApptInList(id, list) {
    return list.filter(({ _id }) => _id === id).length !== 0;
  }

  isApptLoaded(id) {
    return this.isApptInList(id, this.state.appts.asTutor) ||
      this.isApptInList(id, this.state.appts.asTutor);
  }

  fetchAppts = () => {
    const p = this._fetchAppts();

    this.setState({ loading: p });

    return p;
  }

  _fetchAppts = () =>
    this.state.loading || getAppointments(this.props.user)
      .then(appts => this.setState({ loading: null, appts }))
      .catch(console.log)

  props: {
    user: User,
    params: {
      appointmentId: string,
    },
    dispatch: Function,
  }

  handleCardClick = id => () => this.props.dispatch(push(`/appointment/${id}`))

  handleApproved = ({ appointment }) =>
    this.setState(({ appts: { asTutor, asLearner } }) => ({
      appts: {
        asTutor: asTutor.map(appt => appt._id === appointment._id ? appointment : appt),
        asLearner: asLearner.map(appt => appt._id === appointment._id ? appointment : appt),
      },
    }))

  handleRejected = ({ appointment }) =>
    this.setState(({ appts: { asTutor, asLearner } }) => ({
      appts: {
        asTutor: asTutor.map(appt => appt._id === appointment._id ? appointment : appt),
        asLearner: asLearner.map(appt => appt._id === appointment._id ? appointment : appt),
      },
    }))

  renderAppt = (appt, idx) => appt._id === this.props.params.appointmentId
    ? <AppointmentCard selected onApproved={this.handleApproved} onRejected={this.handleRejected} key={idx} appointment={appt}/>
    : <AppointmentCard disabled onClick={this.handleCardClick(appt._id)} key={idx} appointment={appt}/>

  renderAppts = appts =>
    <Card.Group itemsPerRow='3' stackable>
      {this.sortAppts(appts).map(this.renderAppt)}
    </Card.Group>

  sortAppts = appts =>
    [...appts.filter(appt => appt.state !== 'rejected'), ...appts.filter(appt => appt.state === 'rejected')]

  panes = [
    { menuItem: 'Appointments as Tutor',
      render: () => <Tab.Pane loading={Boolean(this.state.loading)}>
        {this.state.appts.asTutor.length !== 0
          ? this.renderAppts(this.state.appts.asTutor)
          : <Header>There are not appointments where you are the tutor.</Header>}
      </Tab.Pane>,
    },
    { menuItem: 'Appointments as Learner',
      render: () => <Tab.Pane loading={Boolean(this.state.loading)}>
        {this.state.appts.asLearner.length !== 0
          ? this.renderAppts(this.state.appts.asLearner)
          : <Header>There are not appointments where you are the learner.</Header>}
      </Tab.Pane>,
    },
  ]

  defaultPane = () => {
    if (
      this.state.appts.asLearner
      .filter(
        appt => appt._id === this.props.params.appointmentId
      ).length === 0
    ) return 0;

    return 1;
  }
  render() {
    return (
      <Container>
        <Tab menu={{ pointing: true, widths: 2 }} defaultActiveIndex={this.defaultPane()} panes={this.panes} />
      </Container>
    );
  }
}

export default connect(
  ({ user }, { match: { params } }) => ({ user, params }),
)(AppointmentView);
