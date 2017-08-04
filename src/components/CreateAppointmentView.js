import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import { getUser } from '~/fetches';
import type User from '~/types/User';


class CreateAppointmentView extends Component {
  state = {
    loading: null,
    tutor: null,
  }

  componentWillMount() {
    this.loadTutor();
  }

  componentWillRecieveProps() {
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

  render() {
    return (
      <Segment loading={this.state.loading}>
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
