import React from 'react';
import PropTypes from 'prop-types';
import MemberModal from '../MemberModal/MemberModal';

class SingleGroup extends React.Component {
  static propTypes = {
    group: PropTypes.object,
    currentUser: PropTypes.object,
    toggleMemberModal: PropTypes.func,
    memberModal: PropTypes.bool,
    userGroupsData: PropTypes.array,
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

  render() {
    const {
      group,
      toggleMemberModal,
      memberModal,
      userGroupsData,
    } = this.props;

    return (
    <tr className="createdGroup">
      <td className="group-name"onClick = {() => { this.toggleEvent(); this.getAllUserEmails(); }}>{group.groupName}</td>
      <td><button className="bttn-pill bttn-warning"><i className="far fa-edit fa-1x"/></button></td>
      <MemberModal
      toggleMemberModal= {toggleMemberModal}
      memberModal = {memberModal}
      userGroupsData = {userGroupsData}
      />
    </tr>
    );
  }
}

export default SingleGroup;
