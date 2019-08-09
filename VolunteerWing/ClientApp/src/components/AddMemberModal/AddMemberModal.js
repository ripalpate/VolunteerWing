import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import userGroupRequests from '../../helpers/data/userGroupRequests';
import './AddMemberModal.scss';

const defaultMember = {
  userEmail: '',
  groupId: 0,
};

class AddMemberModal extends React.Component {
    state = {
      newMember: defaultMember,
    }

    static propTypes = {
      addMemberModal: PropTypes.bool,
      toggleAddMemberModalEvent: PropTypes.func,
    }

    toggleEvent = () => {
      const { toggleAddMemberModal } = this.props;
      toggleAddMemberModal();
    }

    formFieldStringState = (name, e) => {
      e.preventDefault();
      const tempMember = { ...this.state.newMember };
      tempMember[name] = e.target.value;
      this.setState({ newMember: tempMember });
    }

    emailChange = e => this.formFieldStringState('userEmail', e);

    createUserGroup = (myUserGroup) => {
      const { toggleAddMemberModal } = this.props;
      userGroupRequests.createUserGroup(myUserGroup)
        .then(() => {
          this.setState({ newMember: defaultMember }, toggleAddMemberModal());
        });
    }

      formSubmit = (e) => {
        const group = { ...this.props.group };
        // const { getAllUserGroupsByGroupId } = this.props;
        e.preventDefault();
        const myUserGroup = { ...this.state.newMember };
        myUserGroup.groupId = group.id;
        this.createUserGroup(myUserGroup);
        // getAllUserGroupsByGroupId(group.id);
      }

      render() {
        const newMember = { ...this.state.newMember };
        const { addMemberModal } = this.props;
        return (
      <Modal isOpen={addMemberModal} toggle={this.toggleEvent} className="modal-lg">
        <ModalHeader className="modal-header text-center header" toggle={this.toggleEvent}>Add Member</ModalHeader>
        <ModalBody className="modal-body">
          <div>
            <div className="form-group member row">
              <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
              <div className="col-sm-10">
                <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Group name"
                value= {newMember.userEmail}
                onChange= {this.emailChange}
                />
              </div>
              <div className ="mx-auto">
                <button className="bttn-pill bttn-success mt-3" onClick={this.formSubmit}><i className="fas fa-plus-circle pr-2"></i>Add Me!</button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
        );
      }
}

export default AddMemberModal;
