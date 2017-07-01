import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import { Container, Row, Col } from 'react-grid-system';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { pipe } from '~/util';
import { push } from 'react-router-redux';
import { signIn } from '~/actions';
import { createUser } from '~/fetches';

class SignUp extends Component {
  state = {
    loading: false,
    errors: [],
  }

  props: {
    onSignUp: Function,
  }

  handleSubmit = user => {
    this.setState({ loading: true });

    return createUser(user)
      .then(pipe(() => this.setState({ loading: false, errors: [] })))
      .then(({ user, token }) => this.props.onSignUp(token, user))
      .catch(err => this.setState({ loading: false, errors: [err] }))
    ;
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col
            md={6} lg={4}
            offset={{ md: 3, lg: 4 }}>
            <Segment>
              <SignUpForm
                onSubmit={this.handleSubmit}
                {...this.state} />
            </Segment>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    onSignUp: (token, user) => {
      dispatch(push('/'));
      dispatch(signIn(user, token));
    },
  }),
)(SignUp);
