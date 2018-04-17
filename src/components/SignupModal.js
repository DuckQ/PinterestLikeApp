import React from 'react';
import Modal from 'react-modal';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { setIsRegistering } from '../redux/actions/modalActions';

const SignupModal = (props) => {


  return (
      <Modal
        isOpen={props.isRegistering}
        contentLabel="Sign Up"
        onRequestClose={props.setIsRegistering}
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal"
      >
        <SignupForm />
      </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    isRegistering: state.modal.isRegistering
  }
}

export default connect(mapStateToProps, { setIsRegistering })(SignupModal)
