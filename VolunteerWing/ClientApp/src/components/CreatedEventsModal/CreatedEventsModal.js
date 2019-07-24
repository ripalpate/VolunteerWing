import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import './CreatedEventsModal.scss';

class CreatedEventsModal extends React.Component {
    static propTypes = {
      toggleCreatedEventsModal: PropTypes.func,
      createdEventsModal: PropTypes.bool,
      currentUser: PropTypes.object,
    }

      toggleEvent = () => {
        const { toggleCreatedEventsModal } = this.props;
        toggleCreatedEventsModal();
      }

      render() {
        const { createdEventsModal, currentUser } = this.props;
        return (
            <Modal isOpen={createdEventsModal} toggle={this.toggleEvent} className="modal-lg">
                <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}>Events</ModalHeader>
                <ModalBody className="modal-body">
                    <div>
                        <h4>Event</h4>
                        <p>Start Date</p>
                    </div>
                </ModalBody>
            </Modal>
        );
      }
}

export default CreatedEventsModal;
