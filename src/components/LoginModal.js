import React from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { setIsLogining } from '../redux/actions/modalActions';

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
        <LoginForm />
      </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    isLogining: state.registration.isLogining
  }
}

export default connect(mapStateToProps, { setIsLogining })(LoginModal)