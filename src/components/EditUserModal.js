import React, { Component } from 'react';
import { Form, Message, Modal, Button, Input, Label } from 'semantic-ui-react';
import { validate as validateEmail } from 'email-validator';

import { validateZipCode, validateWage } from '~/util';

import EditableList from './EditableList';


class EditUserForm extends Component {
  static defaultProps = {
    onSave: () => {},
    onCancel: () => {},
    success: '',
    loading: false,
    errors: [],
    fieldErrors: {
      email: false,
      username: false,
      zipCode: false,
      isTutor: false,
      wage: false,
    },
  }

  state = {
    email: this.props.user.email,
    username: this.props.user.username,
    zipCode: this.props.user.zipCode,
    isTutor: this.props.user.isTutor,
    wage: this.props.user.wage,
    subjects: [...this.props.user.subjects],
    success: this.props.success,
    errors: [...this.props.errors],
  }

  componentWillReceiveProps({ success, errors }) {
    this.setState({
      success,
      errors: [...errors],
    });
  }

  props: {
    user: {
      email: string,
      username: string,
      isTutor: boolean,
      subjects: Array<string>,
      zipCode?: number,
      wage: number,
    },
    onSave: Function,
    onCancel: Function,
    success: string,
    errors: Array<string>,
    loading: boolean,
    fieldErrors: {
      email: boolean,
      username: boolean,
      zipCode: boolean,
      isTutor: boolean,
      wage: boolean,
    }
  }

  handleChange = (e, { name, value, checked }) =>
    this.setState({ [name]: value || checked })

  handleCancel = this.props.onCancel

  handleSave = () => {
    const errors = Object.entries(this.computeFieldValidity())
      .filter(([_, validity]) => !validity)
      .map(([field]) => field)
      .map(field => `The ${field} field is not valid.`)
    ;

    this.setState({ errors: [...errors] });

    // if there are errors dont submit
    if (errors.length) return;

    this.props.onSave([
      'username',
      'email',
      'isTutor',
      'zipCode',
      'subjects',
      'wage',
    ].reduce(
      (u, field) =>
        field in this.state
          ? { ...u, [field]: this.state[field] }
          : u,
      {},
    ));
  }

  handleSubjects = subjects => {
    this.setState({ subjects });
  }

  computeFieldValidity = () => ({
    username: true,
    email: !this.state.email || validateEmail(this.state.email),
    isTutor: true,
    zipCode: !this.state.zipCode || validateZipCode(this.state.zipCode),
    wage: !this.state.wage || validateWage(this.state.wage),
  })

  computeFieldErrors = () => ({
    username:
      !this.computeFieldValidity().username ||
      this.props.fieldErrors.username,
    email:
      !this.computeFieldValidity().email ||
      this.props.fieldErrors.email,
    isTutor:
      !this.computeFieldValidity().isTutor ||
      this.props.fieldErrors.isTutor,
    zipCode:
      !this.computeFieldValidity().zipCode ||
      this.props.fieldErrors.zipCode,
    wage:
      !this.computeFieldValidity().wage ||
      this.props.fieldErrors.wage,
  })

  render() {
    const { errors, success } = this.state;
    const fieldErrors = this.computeFieldErrors();

    return (
      <Modal open dimmer='blurring' size='small' onClose={this.handleCancel}>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={this.handleSubmit}
            success={Boolean(success)}
            error={Boolean(errors.length)}
            loading={this.props.loading} >

            <Form.Field>
              <label>Email</label>
              <Input
                name='email'
                autoComplete='off'
                error={fieldErrors.email}
                onChange={this.handleChange}
                defaultValue={this.props.user.email}
                placeholder={this.props.user.email} />
            </Form.Field>

            <Form.Field>
              <label>Username</label>
              <Input
                name='username'
                autoComplete='off'
                error={fieldErrors.username}
                onChange={this.handleChange}
                defaultValue={this.props.user.username}
                placeholder={this.props.user.username} />
            </Form.Field>

            <Form.Checkbox
              name='isTutor'
              label='Tutor'
              defaultChecked={this.props.user.isTutor}
              error={fieldErrors.isTutor}
              onChange={this.handleChange} />

            {this.state.isTutor ? <Form.Field>
              <label>Hourly Wage</label>
              <Input
                name='wage'
                autoComplete='off'
                labelPosition='right'
                error={fieldErrors.wage}
                onChange={this.handleChange}
                defaultValue={this.props.user.wage}
                placeholder={this.props.user.wage}>

                <Label>$</Label>
                <input />
                <Label>per hour</Label>
              </Input>
            </Form.Field> : null}

            {this.state.isTutor ? <Form.Field>
              <label>ZIP Code</label>
              <Input
                name='zipCode'
                autoComplete='off'
                error={fieldErrors.zipCode}
                onChange={this.handleChange}
                defaultValue={this.props.user.zipCode}
                placeholder={this.props.user.zipCode} />
            </Form.Field> : null}

            {this.state.isTutor ? <Form.Field>
              <label>Teachable Subjects</label>
              <EditableList
                list={this.state.subjects}
                onChange={this.handleSubjects} />
            </Form.Field> : null}

            <Message
              success
              content={success} />

            {errors.map((error, idx) =>
              <Message
                key={idx}
                error
                content={error || 'Error'} />
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleCancel}>Cancel</Button>
          <Button positive onClick={this.handleSave}>Save</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditUserForm;

