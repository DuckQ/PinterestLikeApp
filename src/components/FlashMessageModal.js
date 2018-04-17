import React from 'react';
import Modal from 'react-modal';
import FlashMessage from './FlashMessage';
import { connect } from 'react-redux';
import { setShowFlashMessage } from '../redux/actions/modalActions';

const FlashMessageModal = (props) => {
  return (
      <Modal
        isOpen={props.showFlashMessage}
        contentLabel="Flash Message"
        onRequestClose={props.setShowFlashMessage}
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal"
      >
        <FlashMessage />
      </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    showFlashMessage: state.modal.showFlashMessage
  }
}

export default connect(mapStateToProps, {setShowFlashMessage})(FlashMessageModal)
