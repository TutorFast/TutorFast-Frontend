import React, { Component } from 'react';
import { Form, Message, Checkbox } from 'semantic-ui-react';
import { validate } from 'email-validator';

class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
        value: ''
      },
      subjects: [],
      isTutor: false,
      success: props.success,
      errors: [...props.errors],
    };
  }

  static defaultProps = {
    onSubmit: () => {},
    success: '',
    loading: false,
    errors: [],
    fieldErrors: {
      email: false,
      username: false,
      password: false,
      wage: false,
      subjects: false,
    },
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
      username: boolean,
      password: boolean,
      wage: boolean,
      subjects: boolean,
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: { value, pristine: false } })
    //console.log(`${name} = ${value}`);
  }

  handleCheckboxChange = () => {
    this.setState({isTutor: !this.state.isTutor});
  }

  handleSubjectsChange = (e, {name, value}) => {
    var list = value.split(',');
    this.setState({subjects: [list]});
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

    const { username, password, email, isTutor, wage, subjects } = this.state;
    this.props.onSubmit({
      username: username.value,
      password: password.value,
      email: email.value,
      isTutor: isTutor,
      wage: wage.value,
      subjects: subjects,
    });  
}

  computeFieldValidity = () => ({
    username: this.state.username.value,
    email: validate(this.state.email.value),
    password: this.state.password.value,
    wage: this.state.wage.value,
    subjects: this.state.subjects,
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
    wage:
      !this.state.wage.pristine &&
      !this.computeFieldValidity().wage ||
      this.props.fieldErrors.wage,
    subjects:
      !this.computeFieldValidity().subjects ||
      this.props.fieldErrors.subjects,
  })

  render() {
    const { errors, success } = this.state;
    const fieldErrors = this.computeFieldErrors();

    var subjects = [];

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

        <Checkbox
          label='I am a Tutor!'
          onChange={this.handleCheckboxChange}
          value={this.state.isTutor}
        />

        <br/>
  
        {this.state.isTutor
          ? <Form.Input
            name='wage'
            label='Wage'
            placeholder='Wage in $/hr'
            error={fieldErrors.wage}
            onChange={this.handleChange}
          />
          : null
        }
                
        {this.state.isTutor
          ? 
            <Form.Input
            name='subjects'
            label='Subjects separated by commas'
            placeholder='Ex. "Algebra, US History, Biology, etc"'
            error={fieldErrors.subjects}
            onChange={this.handleSubjectsChange}
          /> 
          : null
        }

        <br/>
        
        <Form.Button content='Sign Up!' />

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
    );
  }
}

export default SignUpForm;
