import React from 'react';
import { Segment, Container, Header, Button, Grid, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { toast } from '~/util';

import StripeBlerb from './StripeBlerb';
import MailgunBlerb from './MailgunBlerb';


const HomeView = ({ dispatch } : { dispatch: Function }) =>
  <Container textAlign='center'>
    <Segment inverted>
      <Header as='h1' style={{ margin: '70px 0 30px 0', fontSize: '64px' }}>
        Tutor<em>Fast</em>
      </Header>
      <p style={{ fontSize: '20px', marginBottom: '40px' }}>
        Working to close the gap between Tutors and Learners everywhere!
      </p>

      <Button.Group inverted size='huge' style={{ marginBottom: '60px' }}>
        <Button primary onClick={() => dispatch(push('/sign-in'))}>
          Sign In
        </Button>
        <Button.Or />
        <Button primary onClick={() => dispatch(push('/sign-up'))}>
          Sign Up
        </Button>
      </Button.Group>
    </Segment>
    <Grid stackable>
      <Grid.Row>
        <Grid.Column width={7}>
          <Segment padded>
            <Header as='h1'>Find a Tutor right now!</Header>
            <p style={{ fontSize: '20px' }}>
              If you want to learn, we have what you're looking for.
            </p>

            <Button primary
              content='Search Tutors!'
              icon='chevron right'
              labelPosition='right'
              size='huge'
              onClick={() => dispatch(push('/search'))} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={9}>
          <Segment padded>
            <Header as='h1'>
              The
              <Label horizontal color='black' size='massive'>
                Tutor<em>Fast</em>
              </Label>
              Objective
            </Header>

            <p style={{ fontSize: '20px', textAlign: 'left' }}>
              For students of all ages, finding a tutor can be a stressful and
              time consuming activity.  You would normally have to contact different
              tutor services to find tutors that fit your needs and budget.  There
              is an ever-growing demand for tutors to cater to looming deadlines and
              last-minute cramming. Since, it’s the on-demand economy, there is need
              for platforms that could enable an easy and fast communication between
              students and tutors.
            </p>
            <Button content='Test Toast' onClick={() => toast('test', { 
              onCloseButtonClick: () => console.log('lksdjf'),
              closeButtonContent: 'slkdflkdsj',
              closeButtonType: 'positive',
              type: 'error',
            })} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={10}>
          <StripeBlerb />
        </Grid.Column>
        <Grid.Column width={6}>
          <MailgunBlerb />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
;

export default connect()(HomeView);
