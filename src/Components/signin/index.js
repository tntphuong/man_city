import React, { Component } from 'react';
import { firebase } from '../../firebase';

import FormField from '../ui/FormField';
import { validate } from '../ui/misc';

class SignIn extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter email : admin@gmail.com'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter password : admin123'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ''
      }
    }
  };

  EmailInputOnChange = (e, id) => {
    const newformdata = { ...this.state.formdata };
    const newElement = { ...newformdata[id] };

    newElement.value = e.target.value;

    let validData = validate(newElement);

    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newformdata[id] = newElement;

    this.setState({
      formError: false,
      formdata: newformdata
    });
  };

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push('/dashboard');
        })
        .catch(error => {
          this.setState({
            formError: true
          });
        });
    } else {
      this.setState({
        formError: true
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="signin_wrapper" style={{ margin: '100px' }}>
          <form onSubmit={event => this.submitForm(event)}>
            <h2>Please Login</h2>

            <FormField
              id={'email'}
              formdata={this.state.formdata.email}
              onChangeFunc={(e, id) => this.EmailInputOnChange(e, id)}
            />

            <FormField
              id={'password'}
              formdata={this.state.formdata.password}
              onChangeFunc={(e, id) => this.EmailInputOnChange(e, id)}
            />
            {this.state.formError ? (
              <div className="error_label">Something is wrong, try again.</div>
            ) : null}
            <button onClick={event => this.submitForm(event)}>Log in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
