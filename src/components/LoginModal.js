import React from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { setIsLogining } from '../redux/actions/modalActions';
import { login } from '../redux/actions/authActions';

const LoginModal = (props) => {
  return (
      <Modal
        isOpen={props.isLogining}
        contentLabel="Sign Up"
        onRequestClose={props.setIsLogining}
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal"
      >
      <div className="form-wrapper" >
        <h3 className="form-wrapper__title" >Log in here</h3>
        <LoginForm login={props.login} setIsLogining={props.setIsLogining} />
      </div>
      </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    isLogining: state.modal.isLogining
  }
}

export default connect(mapStateToProps, { setIsLogining, login })(LoginModal)