import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import invitationRequests from '../../helpers/data/invitationRequests';
import formateDateTime from '../../helpers/formatDateTime';
import groupRequests from '../../helpers/data/groupRequests';
import AddGroupModal from '../AddGroupModal/AddGroupModal';
import './InvitationModal.scss';

const defaultInvitation = {
  to: '',
  subject: '',
  body: '',
};

class InvitationModal extends React.Component {
  invitationMounted = false;

    state = {
      newInvitation: defaultInvitation,
      groups: [],
      addGroupModal: false,
    }

    static propTypes = {
      toggleInvitationModal: PropTypes.func,
      invitationModal: PropTypes.bool,
      currentUser: PropTypes.object,
      routeToCreatedEvents: PropTypes.func,
    }

    getAllGroupsByAdminId = () => {
      const { currentUser } = this.props;
      groupRequests.getAllGroupsByAdminId(currentUser.id)
        .then((groups) => {
          this.setState({ groups });
        });
    }

    componentDidMount() {
      const { currentUser } = this.props;
      this.invitationMounted = !!currentUser.id;
      if (this.invitationMounted) {
        this.getAllGroupsByAdminId();
      }
    }

    componentWillUnmount() {
      this.invitationMounted = false;
    }

    toggleGroupModal = () => {
      const { addGroupModal } = this.state;
      this.setState({ addGroupModal: !addGroupModal });
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
      const { toggleInvitationModal, routeToCreatedEvents, singleEvent } = this.props;
      const currentUser = { ...this.props.currentUser };
      const myInvitation = { ...this.state.newInvitation };
      const message = `Hello Friends, 
        Please take a minute to signup for a volunteer spot to help with ${singleEvent.eventName} on ${formateDateTime.formatMDYDate(singleEvent.startDate)}. Below is the link to sign up for the event.

      http://localhost:64575/createdEvent/${singleEvent.id}

      Thank you, 
      ${currentUser.name}`;
      myInvitation.from = currentUser.email;
      myInvitation.body = message;
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
      const { newInvitation, addGroupModal } = this.state;
      const groups = [...this.state.groups];
      const message = `Hello Friends, 
  Please take a minute to signup for a volunteer spot to help with ${singleEvent.eventName} on ${formateDateTime.formatMDYDate(singleEvent.startDate)}.
Below is the link to sign up for the event.

http://localhost:64575/createdEvent/${singleEvent.id}

Thank you, 
${currentUser.name}`;

      const makeGroupDropDown = () => (
          <select id="group" className="custom-select mb-2 ml-3">
            <option defaultValue>Select Group</option>
              {
              groups.map((group, i) => (<option value={group.id} key={i}>{group.GroupName}</option>))
              }
          </select>
      );

      return (
            <Modal isOpen={invitationModal} toggle={this.toggleEvent} className="modal-lg">
                <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}>Send Invitation</ModalHeader>
                <ModalBody className="modal-body">
                    <div className= "task-modal-form">
                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">From:</label>
                            <div className="col-sm-10">
                                <p className="col-sm-2 col-form-label">{currentUser.email}</p>
                            </div>
                        </div>
                        <div className="form-inline">
                        <div className="form-group">
                          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Select Group</label>
                          <div className="col-sm-10">
                            {makeGroupDropDown()}
                          </div>
                        </div>
                        <button className="bttn-pill" onClick={this.toggleGroupModal}><i className="fas fa-plus-circle"></i></button>
                        <AddGroupModal
                         currentUser = {currentUser}
                         toggleGroupModal = {this.toggleGroupModal}
                         addGroupModal = {addGroupModal}
                         getAllGroupsByAdminId = {this.getAllGroupsByAdminId}
                        />
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
                                <input
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
                              <pre className="col-form-label">{message}</pre>
                            </div>
                        </div>
                        <div>
                            <button className="bttn-pill bttn-primary" onClick={this.formSubmit}>Send</button>
                        </div>
                       </div>

                </ModalBody>
            </Modal>
      );
    }
}

export default InvitationModal;
