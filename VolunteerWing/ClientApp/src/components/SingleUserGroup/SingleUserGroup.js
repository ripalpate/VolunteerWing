import React from 'react';
import PropTypes from 'prop-types';
import './SingleUserGroup.scss';

class SingleUserGroup extends React.Component {
  static propTypes = {
    userGroup: PropTypes.object,
  }

  deleteSingleMemberEmail = () => {
    const { userGroup, deleteEmail } = this.props;
    const userGroupId = userGroup.id;
    const id = userGroup.groupId;
    deleteEmail(userGroupId, id);
  }

  render() {
    const { userGroup } = this.props;
    return (
    <tr className="createdGroup">
        <td>{userGroup.userEmail}</td>
        <td>{userGroup.length}</td>
        <td className="text-right"><button className="bttn-jelly bttn-danger" onClick={this.deleteSingleMemberEmail}><i className="fas fa-times-circle pr-2"></i>Remove</button></td>
    </tr>
    );
  }
}

export default SingleUserGroup;
