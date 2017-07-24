import React from 'react';
import { Header, Icon, List } from 'semantic-ui-react';

export default
(
  { user } :
  { user: {} }
) =>
  <div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='user' circular />
      <Header.Content>
        Profile Details
      </Header.Content>
    </Header>

    <List divided relaxed='very'>
      <List.Item>
        <List.Icon name='vcard' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header>{user.username}</List.Header>
          <List.Description>Your secret codename 😎.</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name='mail' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header>{user.email}</List.Header>
          <List.Description>An email where you can be reached.</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name='book' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header>{user.isTutor ? 'Tutor' : 'Learner'}</List.Header>
          <List.Description>Account type.</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name='credit card'
          color={user.card ? 'green' : 'red'}
          size='large'
          verticalAlign='middle' />
        <List.Content>
          <List.Header>Payment</List.Header>
          <List.Description>{
            user.card
              ? 'You have a payment method set.'
              : 'You have no payment method set.'
          }</List.Description>
        </List.Content>
      </List.Item>

      {user.isTutor && user.zipCode ? <List.Item>
        <List.Icon name='location arrow' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header>{user.zipCode}</List.Header>
          <List.Description>The ZIP code you teach in.</List.Description>
        </List.Content>
      </List.Item> : null}
      {user.isTutor ? <List.Item>
        <List.Icon name='dollar' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header>{`$${user.wage}/hour`}</List.Header>
          <List.Description>Your hourly wage.</List.Description>
        </List.Content>
      </List.Item> : null}
      {user.isTutor && user.subjects.length ? <List.Item>
        <List.Icon name='idea' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header>
            <List items={user.subjects} />
          </List.Header>
          <List.Description>Your teachable subjects.</List.Description>
        </List.Content>
      </List.Item> : null}
    </List>
  </div>
;
