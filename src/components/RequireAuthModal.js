import React from 'react';
import Modal from 'react-modal';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { LoginForm } from './LoginForm';
import { setIsRegistering, setIsLoginRequired } from '../redux/actions/modalActions';
import { login } from '../redux/actions/authActions';

class RequireAuthModal extends React.Component {
  constructor(props) {
    super(props)
  
    this.onClick = this.onClick.bind(this);
  };

  onClick() {
    this.props.setIsLoginRequired();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isLoginRequired}
        contentLabel="Sign Up"
        onRequestClose={this.props.setIsLoginRequired}
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal"
      >
        <div className="form-wrapper" >
          <h3 className="form-wrapper__title" >Please, log in to your account if you want to pin image</h3>
          <LoginForm login={this.props.login} setIsLoginRequired={this.props.setIsLoginRequired}/>
          <p>If you don't have an account yet, it is a time to create one!</p>
          <button onClick={this.onClick} type="submit" >Registration</button>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginRequired: state.modal.isLoginRequired
  }
}

export default connect(mapStateToProps, { setIsRegistering, setIsLoginRequired, login })(RequireAuthModal)
