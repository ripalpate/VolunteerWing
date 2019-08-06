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
        <td><button className="bttn-pill bttn-danger" onClick={this.deleteSingleMemberEmail}><i className="fas fa-times-circle"></i></button></td>
    </tr>
    );
  }
}

export default SingleUserGroup;
