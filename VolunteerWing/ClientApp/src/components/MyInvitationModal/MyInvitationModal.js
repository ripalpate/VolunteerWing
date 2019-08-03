import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import './MyInvitationModal.scss';

class MyInvitationModal extends React.Component {
    static propTypes = {
      myInvitationModal: PropTypes.bool,
      toggleMyInvitationModal: PropTypes.func,
    }

    toggleEvent = () => {
      const { toggleMyInvitationModal } = this.props;
      toggleMyInvitationModal();
    }

    render() {
      const { myInvitationModal } = this.props;
      return (
          <Modal isOpen={myInvitationModal} toggle={this.toggleEvent} className="modal-lg">
            <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}>My Invitations</ModalHeader>
            <ModalBody className="modal-body">

            </ModalBody>
          </Modal>
      );
    }
}

export default MyInvitationModal;
