import React, { Component } from 'react';
import { Form, Message, Checkbox, Input, Label, Button } from 'semantic-ui-react';
import { validate } from 'email-validator';

import { validateZipCode, validateWage } from '~/util';

import EditableList from './EditableList';

class SignUpForm extends Component {
  static defaultProps = {
    subjects: [],
    onSubmit: () => {},
    success: '',
    loading: false,
    errors: [],
    fieldErrors: {
      email: false,
      username: false,
      password: false,
      wage: false,
      zipCode: false,
      subjects: false,
    },
  }

  state = {
    email: {
      pristine: true,
      value: '',
    },
    username: {
      pristine: true,
      value: '',
    },
    password: {
      pristine: true,
      value: '',
    },
    wage: {
      pristine: true,
      value: '',
    },
    zipCode: {
      pristine: true,
      value: '',
    },
    subjects: [...this.props.subjects],
    isTutor: false,
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
    subjects: Array<string>,
    onSubmit: Function,
    success: string,
    errors: Array<string>,
    loading: boolean,
    fieldErrors: {
      email: boolean,
      username: boolean,
      password: boolean,
      wage: boolean,
      zipCode: boolean,
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: { value, pristine: false } });
    // console.log(`${name} = ${value}`);
  }

  handleCheckboxChange = () => {
    this.setState({ isTutor: !this.state.isTutor });
  }

  handleSubjects = subjects => {
    this.setState({ subjects });
  }

  handleSubmit = () => {
    const errors = Object.entries(this.computeFieldValidity())
      .filter(([_, validity]) => !validity)
      .map(([field]) => field)
      .map(field => `The ${field} field is not valid.`)
    ;

    this.setState({
      errors: [...errors],
      username: { ...this.state.username, pristine: false },
      password: { ...this.state.password, pristine: false },
      email: { ...this.state.email, pristine: false },
    });


    // if there are errors dont submit
    if (errors.length) return;

    const { username, password, email, isTutor, wage, zipCode, subjects } = this.state;
    this.props.onSubmit({
      username: username.value,
      password: password.value,
      email: email.value,
      isTutor,
      wage: wage.value,
      zipCode: zipCode.value,
      subjects,
    });
  }

  computeFieldValidity = () => ({
    username: this.state.username.value,
    email: validate(this.state.email.value),
    password: this.state.password.value,
  })

  computeFieldErrors = () => ({
    username:
      !this.state.username.pristine &&
      !this.computeFieldValidity().username ||
      this.props.fieldErrors.username,
    email:
      !this.state.email.pristine &&
      !this.computeFieldValidity().email ||
      this.props.fieldErrors.email,
    password:
      !this.state.password.pristine &&
      !this.computeFieldValidity().password ||
      this.props.fieldErrors.password,
  })

  render() {
    const { errors, success } = this.state;
    const fieldErrors = this.computeFieldErrors();

    let subjects = [];

    return (
      <Form
        onSubmit={this.handleSubmit}
        success={Boolean(success)}
        error={Boolean(errors.length)}
        loading={this.props.loading} >

        <Form.Input
          name='email'
          label='Email'
          placeholder='your@email.com'
          error={fieldErrors.email}
          onChange={this.handleChange} />

        <Form.Input
          name='username'
          label='Username'
          placeholder='Super Tutor'
          error={fieldErrors.username}
          onChange={this.handleChange} />

        <Form.Input
          name='password'
          label='Password'
          type='password'
          error={fieldErrors.password}
          onChange={this.handleChange} />

        <Form.Checkbox
          name='isTutor'
          label='I am a Tutor!'
          onChange={this.handleCheckboxChange}
          defaultChecked={this.state.isTutor}/>

        <br/>

        {this.state.isTutor ? <Form.Field>
          <label>Hourly Wage</label>
          <Input
            name='wage'
            labelPosition='right'
            label='Wage'
            placeholder='Wage in $/hr'
            error={fieldErrors.wage}
            onChange={this.handleChange} />
        </Form.Field> : null }

        {this.state.isTutor ? <Form.Field>
          <label>ZIP Code</label>
          <Input
            name='zipCode'
            error={fieldErrors.zipCode}
            onChange={this.handleChange} />
        </Form.Field> : null}

        {this.state.isTutor ? <Form.Field>
          <label>Teachable Subjects</label>
          <EditableList
            list={this.state.subjects}
            onChange={this.handleSubjects} />
        </Form.Field> : null}

        <Form.Button content='Sign Up!' />

        <Message
          success
          content={success} />

        {errors.map((error, idx) =>
          <Message
            key={idx}
            error
            content={error && error.toString() || 'Error'} />
        )}

      </Form>
    );
  }
}

export default SignUpForm;
