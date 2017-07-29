import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { validate } from 'email-validator';

class SignInForm extends Component {
  static defaultProps = {
    onSubmit: () => {},
    success: '',
    loading: false,
    errors: [],
    fieldErrors: {
      email: false,
      password: false,
    },
  }

  state = {
    email: {
      pristine: true,
      value: '',
    },
    password: {
      pristine: true,
      value: '',
    },
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
    onSubmit: Function,
    success: string,
    errors: Array<string>,
    loading: boolean,
    fieldErrors: {
      email: boolean,
      password: boolean,
    }
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name]: { value, pristine: false } })

  handleSubmit = () => {
    const errors = Object.entries(this.computeFieldValidity())
      .filter(([_, validity]) => !validity)
      .map(([field]) => field)
      .map(field => `The ${field} field is not valid.`)
    ;

    this.setState({
      errors: [...errors],
      password: { ...this.state.password, pristine: false },
      email: { ...this.state.email, pristine: false },
    });


    // if there are errors dont submit
    if (errors.length) return;

    const { password, email } = this.state;
    this.props.onSubmit({
      password: password.value,
      email: email.value,
    });
  }

  computeFieldValidity = () => ({
    email: validate(this.state.email.value),
    password: this.state.password.value,
  })

  computeFieldErrors = () => ({
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
          name='password'
          label='Password'
          type='password'
          error={fieldErrors.password}
          onChange={this.handleChange} />

        <Form.Button content='Sign In!' />

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

export default SignInForm;
