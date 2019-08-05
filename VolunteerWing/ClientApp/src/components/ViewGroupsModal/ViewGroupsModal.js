import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import groupRequests from '../../helpers/data/groupRequests';
import userGroupRequests from '../../helpers/data/userGroupRequests';
import SingleGroup from '../SingleGroup/SingleGroup';
import './ViewGroupsModal.scss';

class ViewGroupsModal extends React.Component {
  viewGroupModalMounted = false;

  static propTypes = {
    toggleViewGroupModal: PropTypes.func,
    viewGroupModal: PropTypes.bool,
    currentUser: PropTypes.object,
  }

  state = {
    groups: [],
    memberModal: false,
    userGroupsData: [],
    addMemberModal: false,
  }

  getGroupsByAdminId = () => {
    const { currentUser } = this.props;
    const adminId = currentUser.id;
    groupRequests.getAllGroupsByAdminId(adminId)
      .then((groups) => {
        this.setState({ groups });
      });
  }

  toggleEvent = () => {
    const { toggleViewGroupModal } = this.props;
    toggleViewGroupModal();
  }

  toggleMemberModal = () => {
    const { memberModal } = this.state;
    this.setState({ memberModal: !memberModal });
  }

  toggleAddMemberModal = () => {
    const { addMemberModal } = this.state;
    this.setState({ addMemberModal: !addMemberModal });
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.viewGroupModalMounted = !!currentUser.id;
    if (this.viewGroupModalMounted) {
      this.getGroupsByAdminId();
    }
  }

  getAllUserGroupsByGroupId = (groupId) => {
    userGroupRequests.getAllUserEmailsByGroupId(groupId)
      .then((userGroups) => {
        const userGroupsData = userGroups.data;
        this.setState({ userGroupsData });
      });
  }

  deleteEmail = (userGroupId, groupId) => {
    userGroupRequests.deleteUserGroup(userGroupId)
      .then(() => {
        this.getAllUserGroupsByGroupId(groupId);
      });
  }

  render() {
    const { viewGroupModal, currentUser } = this.props;
    const { groups, memberModal, userGroupsData, addMemberModal } = this.state;

    const singleGroupComponent = groups.map(group => (
      <SingleGroup
       group = {group}
       key = {group.id}
       toggleMemberModal= {this.toggleMemberModal}
       memberModal = {memberModal}
       addMemberModal = {addMemberModal}
       toggleAddMemberModal = {this.toggleAddMemberModal}
       currentUser = {currentUser}
       getAllUserGroupsByGroupId= {this.getAllUserGroupsByGroupId}
       userGroupsData = {userGroupsData}
       deleteEmail = {this.deleteEmail}
       getGroupsByAdminId = {this.getGroupsByAdminId}
      />
    ));

    return (
        <Modal isOpen={viewGroupModal} toggle={this.toggleEvent} className="modal-lg">
        <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}> My Groups</ModalHeader>
        <ModalBody className="modal-body">
          <div>
            <table className="table borderless table-hover">
              <thead>
                <tr>
                <th scope="col">Group Name</th>
                <th></th>
                <th></th>
                </tr>
              </thead>
              <tbody>
                {singleGroupComponent}
              </tbody>
            </table>
          </div>
        </ModalBody>
    </Modal>
    );
  }
}

export default ViewGroupsModal;
