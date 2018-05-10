import React, { Component } from 'react';
import validateInput from '../validation/patch';
import jwtDecode from 'jwt-decode';
import { addFlashMessage } from '../redux/actions/flashMessage';
import { setShowFlashMessage } from '../redux/actions/modalActions';
import { connect } from 'react-redux';

class UpdateUserInfoForm extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userData: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        userAvatar: ''
      },
      errors: {},
      isLoading: false,
      currentAvatar: ''
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPassword2Change = this.onPassword2Change.bind(this);
    this.onUserAvatarChange = this.onUserAvatarChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  };

  // set default avatar
  componentWillMount() {
    if(!this.props.user.userAvatar) {
      const defaultAvatar = 'https://grand-vet.ru/wp-content/uploads/2017/11/default-avatar-250x250.png'
      this.setState({currentAvatar: defaultAvatar})
    }
  }

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

  onUserAvatarChange(e) {
    const userAvatar = e.target.value;
    this.setState( prevState => ({
      userData: {
        ...prevState.userData,
        userAvatar
    }
    }));
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
          this.setState({currentAvatar: e.target.result});
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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
      this.props.updateUserInfo(this.props.user.id, this.state.userData, localStorage.jwtToken)
        .then(response => {
          if (response.status === 401) {
            this.props.logout();
            this.props.addFlashMessage({
              type: 'error',
              text: 'The authentication session has expired. Please sign-in again.'
            });
            this.props.setShowFlashMessage();
          };
          return response.json(); 
        })
        .then(response => {
          if (response.errors) {
            this.setState ({ errors: response.errors, isLoading: false });
          } else {
            this.props.setCurrentUser(jwtDecode(response.token));
            localStorage.setItem('jwtToken', response.token);
            this.setState ({ 
              userData: {
                username: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                userAvatar: ''
              },
              isLoading: false
            });
          }
        })
    }
  };

  render() {
    const { errors, isLoading } = this.state;
    
    return (
    <div className="user-info-form">
      <div className="container" >
        <h2 className="title" >Change your personal information</h2>
        <div className="container__content" >
          <div className="items" >
            <div className="image-wrapper" >
              <img  src={this.state.currentAvatar ? this.state.currentAvatar : this.props.user.userAvatar} alt=""/>
            </div>
            <div>
              <input
              type="file"
              id="userAvatar"
              onChange={this.onUserAvatarChange}
              value={this.state.userData.userAvatar}
              accept="image/*"
              /> 
            </div>
          </div>
          <div className="items" >
            <div className="form-wrapper" >
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
                <button type="submit" disabled={ this.state.isLoading } >Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default connect(null, {addFlashMessage, setShowFlashMessage})(UpdateUserInfoForm);
