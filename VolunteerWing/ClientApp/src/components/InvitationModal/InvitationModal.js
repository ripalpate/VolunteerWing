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
import AddEditGroupModal from '../AddEditGroupModal/AddEditGroupModal';
import './InvitationModal.scss';
import userGroupRequests from '../../helpers/data/userGroupRequests';
import dbInvitationRequests from '../../helpers/data/dbInvitationRequests';

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
      addEditGroupModal: false,
      selectedGroupId: 0,
      userGroups: [],
    }

    static propTypes = {
      toggleInvitationModal: PropTypes.func,
      invitationModal: PropTypes.bool,
      currentUser: PropTypes.object,
      routeToCreatedEvents: PropTypes.func,
      singleEvent: PropTypes.object,
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

    dropdownGroupSelect = (e) => {
      const selectedGroupId = e.target.value * 1;
      this.setState({ selectedGroupId });
    }

    toggleGroupModal = () => {
      const { addEditGroupModal } = this.state;
      this.setState({ addEditGroupModal: !addEditGroupModal });
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

    formFieldArrayState = (name, e) => {
      e.preventDefault();
      const tempInvitation = { ...this.state.newInvitation };
      tempInvitation[name] = e.target.value.split(',');
      this.setState({ newInvitation: tempInvitation });
    }

    createUserGroup = () => {
      const newInvitation = { ...this.state.newInvitation };
      const userGroups = [...this.state.userGroups];
      const { selectedGroupId } = this.state;
      const emailsArray = newInvitation.to;
      const groupId = selectedGroupId;
      emailsArray.forEach((email) => {
        const userGroup = {};
        userGroup.groupId = groupId;
        userGroup.userEmail = email.trim();
        const checkIfuserEmailExist = userGroups.filter(x => x.groupId === groupId && x.userEmail === email);
        if (checkIfuserEmailExist.length === 0) {
          userGroupRequests.createUserGroup(userGroup)
            .then(() => {});
        }
      });
    }

    getAndSetAllEmailsForTheGroup = () => {
      const newInvitation = { ...this.state.newInvitation };
      const { selectedGroupId } = this.state;
      const groupId = selectedGroupId;
      userGroupRequests.getAllUserEmailsByGroupId(groupId)
        .then((emails) => {
          const userGroupEmailsArray = emails.data;
          const arrayOfEmails = userGroupEmailsArray.map(userGroup => userGroup.userEmail);
          newInvitation.to = arrayOfEmails;
          this.setState({ newInvitation });
          this.setState({ userGroups: userGroupEmailsArray });
        });
    }

    createDbInvitation = () => {
      const newInvitation = { ...this.state.newInvitation };
      const emailsArray = newInvitation.to;
      const { singleEvent } = this.props;
      emailsArray.forEach((email) => {
        const invitation = {};
        invitation.userEmail = email.trim();
        invitation.eventId = singleEvent.id;
        invitation.link = `http://localhost:64575/createdEvent/${singleEvent.id}`;
        dbInvitationRequests.createDbInvitation(invitation)
          .then(() => {
          });
      });
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
      this.createUserGroup();
      this.createDbInvitation();
      invitationRequests.createInvitation(myInvitation)
        .then(() => {
          this.setState({ newInvitation: defaultInvitation }, toggleInvitationModal());
          routeToCreatedEvents();
        });
    }

    toChange = e => this.formFieldArrayState('to', e);

    bodyChange = e => this.formFieldStringState('body', e);

    subjectChange = e => this.formFieldStringState('subject', e);

    render() {
      const { invitationModal, currentUser, singleEvent } = this.props;
      const { addEditGroupModal } = this.state;
      const newInvitation = { ...this.state.newInvitation };
      const groups = [...this.state.groups];
      const message = `Hello Friends, 
  Please take a minute to signup for a volunteer spot to help with ${singleEvent.eventName} on ${formateDateTime.formatMDYDate(singleEvent.startDate)}.
Below is the link to sign up for the event.

http://localhost:64575/createdEvent/${singleEvent.id}

Thank you, 
${currentUser.name}`;

      const makeGroupDropDown = () => (
          <select id="group" className="custom-select mb-2 ml-5" onChange={this.dropdownGroupSelect} onClick={this.getAndSetAllEmailsForTheGroup}>
            <option defaultValue>Select Group</option>
              {
              groups.map((group, i) => (<option value={group.id} key={i}>{group.groupName}</option>))
              }
          </select>
      );

      return (
        <Modal isOpen={invitationModal} toggle={this.toggleEvent} className="modal-lg">
          <ModalHeader className="modal-header header" toggle={this.toggleEvent}>Send Invitation</ModalHeader>
          <ModalBody className="modal-body">
            <div className= "task-modal-form">
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">From:</label>
                    <div className="col-sm-10">
                        <p className="col-sm-2 col-form-label from-email">{currentUser.email}</p>
                    </div>
                </div>
                <div className="form-group row">
                  <div className="form-inline select-group">
                    <label className="col-sm-2 col-form-label">Select Group:</label>
                    <div className="col-sm-10">
                      {makeGroupDropDown()}
                    </div>
                  </div>
                  <button className="bttn-pill add-group bttn-success" onClick={this.toggleGroupModal}>
                    <i className="fas fa-plus-circle"></i>
                  </button>
                  <AddEditGroupModal
                    currentUser = {currentUser}
                    toggleGroupModal = {this.toggleGroupModal}
                    addEditGroupModal = {addEditGroupModal}
                    getAllGroupsByAdminId = {this.getAllGroupsByAdminId}
                  />
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">To:</label>
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
                    <button className="bttn-pill bttn-success" onClick={this.formSubmit}>
                      <i className="fas fa-paper-plane pr-2"></i>Send
                    </button>
                </div>
            </div>
          </ModalBody>
        </Modal>
      );
    }
}

export default InvitationModal;
