import React, { Component } from 'react';
import Modal from 'react-modal';
import validateInput from '../validation/signup';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExist } from '../redux/actions/signupActions';
import { setIsRegistering } from '../redux/actions/modalActions';

export class SignupForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        userData: {
          username: '',
          email: '',
          password: '',
          passwordConfirmation: ''
        },
       errors: {},
       isLoading: false,
       invalid: false
    }
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPassword2Change = this.onPassword2Change.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkEmailExist = this.checkEmailExist.bind(this);
  };

  onUsernameChange(e) {
    const username = e.target.value;
    this.setState( prevState => ({
      userData: {
        ...prevState.userData,
        username
    }
    }))
  };

  onEmailChange(e) {
    const email = e.target.value;
    this.setState( prevState => ({
      userData: {
        ...prevState.userData,
        email
    }
    }))
  };

  onPasswordChange(e) {
    const password = e.target.value;
    this.setState( prevState => ({
      userData: {
        ...prevState.userData,
        password
    }
    }))
  };

  onPassword2Change(e) {
    const passwordConfirmation = e.target.value;
    this.setState( prevState => ({
      userData: {
        ...prevState.userData,
        passwordConfirmation
    }
    }))
  };

  isValid() {
    const { errors, isValid } = validateInput(this.state.userData)
    if (!isValid) {
      this.setState({ errors })
    }
    return isValid;
  };

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      // send req to api
      this.props.userSignupRequest(this.state.userData)
        .then(response => response.json())
        .then(response => {
          if (response.errors) {
            this.setState ({ errors: response.errors, isLoading: false });
          } else {
            this.props.setIsRegistering();
          }
        })
    }
  };

  checkEmailExist(e) {
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExist(val)
        .then(response => response.json())
        .then(response => {
          let errors = this.state.errors
          let invalid;
          if (Object.keys(response.user).length > 0) {
            errors.email = 'There is user with such email';
            invalid = true;
          } else {
            errors.email = '';
            invalid = false
          }
          this.setState({ errors, invalid })
        })
    }
  }

  render() {
    const { errors, isLoading } = this.state;

    return (
      <div className="form-wrapper" >
        <h3 className="form-wrapper__title" >Join Our Website</h3>
        <form onSubmit={this.onSubmit} >
          <div> 
            <input
            className={errors.username ? "has-error" : "no-error"}
            type="text"
            onChange={this.onUsernameChange}
            value={this.state.userData.username} 
            placeholder="Username"
            />
            {errors.username && <span className="error-msg">{errors.username}</span>}
          </div>

          <div>
            <input
            className={errors.email ? "has-error" : "no-error"}
            type="text"
            onChange={this.onEmailChange}
            onBlur={this.checkEmailExist}
            value={this.state.userData.email}
            placeholder="Email"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div>
            <input
            className={errors.password ? "has-error" : "no-error"}
            type="password"
            onChange={this.onPasswordChange}
            value={this.state.userData.password}
            placeholder="Password"
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <div>
            <input
            className={errors.passwordConfirmation ? "has-error" : "no-error"}
            type="password"
            onChange={this.onPassword2Change}
            value={this.state.userData.passwordConfirmation}
            placeholder="Confirm Password"
            />
            {errors.passwordConfirmation && <span className="error-msg">{errors.passwordConfirmation}</span>}
          </div>
        
          <button type="submit" disabled={ this.state.isLoading || this.state.invalid } >Sign Up</button>

          </form>
      </div>
    )
  }
}

export default connect(null, { userSignupRequest, isUserExist, setIsRegistering })(SignupForm);
