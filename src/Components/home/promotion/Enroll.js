import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/FormField';

class Enroll extends Component {
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
          placeholder: 'Enter Your Email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ''
      }
    }
  };

  onSubmit = e => {
    console.log('Submit');
  };

  EmailInputOnChange = (e, id) => {
    const newformdata = { ...this.state.formdata };
    const newElement = { ...newformdata[id] };

    newElement.value = e.target.value;
    newformdata[id] = newElement;

    this.setState({
      formdata: newformdata
    });
  };

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={this.onSubmit}>
            <div className="enroll_title">Enter your email</div>

            <div className="enroll_input">
              <FormField
                id={'email'}
                formdata={this.state.formdata.email}
                onChangeFunc={(e, id) => this.EmailInputOnChange(e, id)}
                inputValue={this.state.formdata.email.value}
              />
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
