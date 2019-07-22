import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import './InvitationModal.scss';

class InvitationModal extends React.Component {
    static propTypes = {
      toggleInvitationModal: PropTypes.func,
      invitationModal: PropTypes.bool,
      currentUser: PropTypes.object,
    }

    toggleEvent = () => {
      const { toggleInvitationModal } = this.props;
      toggleInvitationModal();
    }

    render() {
      const { invitationModal, currentUser } = this.props;
      return (
            <Modal isOpen={invitationModal} toggle={this.toggleEvent} className="modal-lg">
                <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}>Send Invitation</ModalHeader>
                <ModalBody className="modal-body">
                    <form className= "task-modal-form">
                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">From:</label>
                            <div className="col-sm-10">
                                <p className="col-sm-2 col-form-label">{currentUser.email}</p>
                            </div>    
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">To:</label>
                            <div className="col-sm-10">
                                <textarea
                                type="text"
                                className="form-control"
                                id="to"
                                placeholder="test@test.com"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="message" className="col-sm-2 col-form-label">Message</label>
                            <div className="col-sm-10">
                                <textarea
                                type="text"
                                className="form-control"
                                id="message"
                                placeholder="Type your message here"
                                />
                            </div>
                        </div>
                        <div>
                            <button className="bttn-pill bttn-primary">Send</button>
                        </div>
                       </form>
                </ModalBody>
            </Modal>
      );
    }
}

export default InvitationModal;
