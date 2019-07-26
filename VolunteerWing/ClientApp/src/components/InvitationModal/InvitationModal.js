import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import invitationRequests from '../../helpers/data/invitationRequests';
import './InvitationModal.scss';

const defaultInvitation = {
  to: '',
  subject: '',
  body: '',
};

class InvitationModal extends React.Component {
    state = {
      newInvitation: defaultInvitation,
    }

    static propTypes = {
      toggleInvitationModal: PropTypes.func,
      invitationModal: PropTypes.bool,
      currentUser: PropTypes.object,
      routeToCreatedEvents: PropTypes.func,
    }

    toggleEvent = () => {
      const { toggleInvitationModal } = this.props;
      toggleInvitationModal();
    }

    formFieldStringState = (name, e) => {
      e.preventDefault();
      const tempInvitation = { ...this.state.newInvitation };
      tempInvitation[name] = e.target.value;
      this.setState({ newInvitation: tempInvitation });
    }

    formSubmit = (e) => {
      e.preventDefault();
      const { toggleInvitationModal, routeToCreatedEvents } = this.props;
      const currentUser = { ...this.props.currentUser };
      const myInvitation = { ...this.state.newInvitation };
      myInvitation.from = currentUser.email;
      invitationRequests.createInvitation(myInvitation)
        .then(() => {
          this.setState({ newInvitation: defaultInvitation }, toggleInvitationModal());
          routeToCreatedEvents();
        });
    }

    formFieldArrayState = (name, e) => {
      e.preventDefault();
      const tempInvitation = { ...this.state.newInvitation };
      tempInvitation[name] = e.target.value.split(',');
      this.setState({ newInvitation: tempInvitation });
    }

    toChange = e => this.formFieldArrayState('to', e);

    bodyChange = e => this.formFieldStringState('body', e);

    subjectChange = e => this.formFieldStringState('subject', e);

    render() {
      const { invitationModal, currentUser, singleEvent } = this.props;
      const { newInvitation } = this.state;
      return (
            <Modal isOpen={invitationModal} toggle={this.toggleEvent} className="modal-lg">
                <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}>Send Invitation</ModalHeader>
                <ModalBody className="modal-body">
                    <form className= "task-modal-form" onSubmit={this.formSubmit}>
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
                                value= {newInvitation.to}
                                onChange= {this.toChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="subject" className="col-sm-2 col-form-label">Subject:</label>
                            <div className="col-sm-10">
                                <textarea
                                type="text"
                                className="form-control"
                                id="subject"
                                placeholder="subject"
                                value= {newInvitation.subject}
                                onChange= {this.subjectChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="message" className="col-sm-2 col-form-label">Message</label>
                            <div className="col-sm-10">
                                {/* <textarea
                                type="text"
                                className="form-control"
                                id="message"
                                placeholder="Type your message here"
                                value= {newInvitation.body}
                                onChange= {this.bodyChange}
                                /> */}
                              <p className="col-sm-2 col-form-label">http://localhost:64575/createdEvent/{singleEvent.id}</p>
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
