import React, { Component } from 'react';
import validateInput from '../validation/login';
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { setIsLogining } from '../redux/actions/modalActions';

export class LoginForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        userData: {
          identifier: '',
          password: ''
        },
       errors: {},
       isLoading: false
    }
    this.onIdentifierChange = this.onIdentifierChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  onIdentifierChange(e) {
    const identifier = e.target.value;
    this.setState( prevState => ({
      userData: {
        ...prevState.userData,
        identifier
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
      this.props.login(this.state.userData)
      // .then(response => response.json()) this is parsed in redux action
      .then(response => { 
        if (response.errors) {
          this.setState ({ errors: response.errors, isLoading: false });
        } else {
          this.props.setIsLogining();
        }
      });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="form-wrapper" >
        <h3 className="form-wrapper__title" >Log in here</h3>
        <form onSubmit={this.onSubmit} >
          <div> 
            <input
            className={errors.identifier ? "has-error" : "no-error"}
            type="text"
            onChange={this.onIdentifierChange}
            value={this.state.userData.identifier} 
            placeholder="Username or Email"
            />
            {errors.identifier && <span className="error-msg">{errors.identifier}</span>}
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
          { errors.form && <div className="error-msg">{errors.form}</div> }
          <button type="submit" disabled={ this.state.isLoading } >Log in</button>
        </form>
      </div>
    )
  }
}

export default connect(null, { setIsLogining, login })(LoginForm);
