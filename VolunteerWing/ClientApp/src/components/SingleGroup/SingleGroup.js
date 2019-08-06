import React from 'react';
import PropTypes from 'prop-types';
import MemberModal from '../MemberModal/MemberModal';
import AddMemberModal from '../AddMemberModal/AddMemberModal';
import AddEditGroupModal from '../AddEditGroupModal/AddEditGroupModal';

class SingleGroup extends React.Component {
  static propTypes = {
    group: PropTypes.object,
    currentUser: PropTypes.object,
    toggleMemberModal: PropTypes.func,
    memberModal: PropTypes.bool,
    addMemberModal: PropTypes.bool,
    toggleAddMemberModal: PropTypes.func,
    userGroupsData: PropTypes.array,
    deleteEmail: PropTypes.func,
    getGroupsByAdminId: PropTypes.func,
  }

  state = {
    addEditGroupModal: false,
    isEditing: false,
  }

  toggleGroupModal = () => {
    const { addEditGroupModal, isEditing } = this.state;
    this.setState({ addEditGroupModal: !addEditGroupModal, isEditing: !isEditing });
  }

  getAllUserEmails = () => {
    const { getAllUserGroupsByGroupId } = this.props;
    const groupId = this.props.group.id * 1;
    getAllUserGroupsByGroupId(groupId);
  }

  toggleEvent = () => {
    const { toggleMemberModal } = this.props;
    toggleMemberModal();
  }

  toggleAddMemberModalEvent = () => {
    const { toggleAddMemberModal } = this.props;
    toggleAddMemberModal();
  }

  render() {
    const {
      group,
      toggleMemberModal,
      memberModal,
      addMemberModal,
      toggleAddMemberModal,
      userGroupsData,
      deleteEmail,
      getGroupsByAdminId,
    } = this.props;

    const { isEditing, addEditGroupModal } = this.state;
    return (
    <tr className="createdGroup table-row">
      <td className="group-name"onClick = {() => { this.toggleEvent(); this.getAllUserEmails(); }}>{group.groupName}</td>
      <td><button className="bttn-pill bttn-warning" onClick={this.toggleGroupModal}><i className="far fa-edit fa-1x"/></button>
        <AddEditGroupModal
        isEditing = {isEditing}
        group = {group}
        addEditGroupModal = {addEditGroupModal}
        toggleGroupModal = {this.toggleGroupModal}
        getGroupsByAdminId = {getGroupsByAdminId}
        />
      </td>
      <td><button className="bttn-pill bttn-success" onClick={this.toggleAddMemberModalEvent}><i className="fas fa-user-plus"></i></button></td>
      <MemberModal
      toggleMemberModal= {toggleMemberModal}
      memberModal = {memberModal}
      userGroupsData = {userGroupsData}
      deleteEmail = {deleteEmail}
      />
      <AddMemberModal
      toggleAddMemberModal= {toggleAddMemberModal}
      addMemberModal = {addMemberModal}
      group = {group}
      />
    </tr>
    );
  }
}

export default SingleGroup;
