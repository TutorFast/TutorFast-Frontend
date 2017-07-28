import React from 'react';
import { Segment, Container, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


const HomeView = ({ dispatch } : { dispatch: Function }) =>
  <Container textAlign='center'>
    <Segment inverted>
      <Header as='h1' style={{ margin: '70px 0 30px 0', fontSize: '64px' }}>
        Tutur<em>Fast</em>
      </Header>
      <p style={{ fontSize: '20px', marginBottom: '40px' }}>
        Working to close the gap between Tutors and Learners everywhere!
      </p>

      <Button.Group inverted size='large' style={{ marginBottom: '30px' }}>
        <Button primary onClick={() => dispatch(push('/sign-in'))}>
          Sign In
        </Button>
        <Button.Or />
        <Button primary onClick={() => dispatch(push('/sign-up'))}>
          Sign Up
        </Button>
      </Button.Group>
    </Segment>
    <Segment>
      <Header as='h2'>Objective</Header>
    </Segment>
  </Container>
;

export default connect()(HomeView);
