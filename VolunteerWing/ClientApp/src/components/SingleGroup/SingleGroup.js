import React from 'react';
import PropTypes from 'prop-types';


class SingleGroup extends React.Component {
  static propTypes = {
    group: PropTypes.object,
    currentUser: PropTypes.object,
  }

  render() {
    const { group } = this.props;

    return (
    <tr className="createdGroup">
      <td className="group-name">{group.groupName}</td>
      <td className="members">memebers</td>
    </tr>
    );
  }
}

export default SingleGroup;
