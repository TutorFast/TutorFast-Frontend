import React, { Component } from 'react';
import { Modal, Input, Header, Button, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { deleteUser } from '~/fetches';
import { signOut } from '~/actions';

class DeleteUserModal extends Component {
  state = {
    loading: false,
    password: '',
    error: '',
  }

  props: {
    token: string,
    path: string,
    dispatch: Function,
  }

  handleClose = () => {
    this.props.dispatch(push(
      this.props.path.split('/').slice(0, -1).join('/')
    ));
  }

  handleDelete = () => {
    this.setState({ loading: true });

    deleteUser({
      password: this.state.password,
      token: this.props.token,
    })
      .then(() => this.props.dispatch(signOut()))
      .then(() => this.props.dispatch(push('/')))
      .catch(error => this.setState({ error, loading: false }))
    ;
  }

  handleChange = (_, { value }) => this.setState({ password: value })

  render() {
    return (
      <Modal open basic size='small' onClose={this.handleClose} >
        <Header icon='user delete' content='Delete Account?' />

        <Modal.Content>
          <Input
            fluid
            placeholder='Password'
            name='password'
            type='password'
            onChange={this.handleChange} />
        </Modal.Content>

        <Modal.Actions>
          <Button
            basic
            inverted
            icon='arrow circle outline left'
            content='Reconsider'
            onClick={this.handleClose} />

          <Button
            color='red'
            inverted
            icon='minus circle'
            content='Delete'
            loading={this.state.loading}
            disabled={!this.state.password}
            onClick={this.handleDelete} />
        </Modal.Actions>

        <Message error inverted hidden={!this.state.error}>
          <Message.Header>User could not be deleted.</Message.Header>
          <p>{this.state.error.toString()}</p>
        </Message>
      </Modal>
    );
  }
}

export default connect(
  ({ router, user }) => ({ path: router.location.pathname, token: user.token }),
)(DeleteUserModal);
