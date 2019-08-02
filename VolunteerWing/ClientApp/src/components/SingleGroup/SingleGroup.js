import React from 'react';
import PropTypes from 'prop-types';
import MemberModal from '../MemberModal/MemberModal';
import AddMemberModal from '../AddMemberModal/AddMemberModal';

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
    } = this.props;

    return (
    <tr className="createdGroup">
      <td className="group-name"onClick = {() => { this.toggleEvent(); this.getAllUserEmails(); }}>{group.groupName}</td>
      <td><button className="bttn-pill bttn-warning"><i className="far fa-edit fa-1x"/></button></td>
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
