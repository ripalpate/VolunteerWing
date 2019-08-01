import React from 'react';
import PropTypes from 'prop-types';

class SingleUserGroup extends React.Component {
  static propTypes = {
    userGroup: PropTypes.object,
  }

  render() {
    const { userGroup } = this.props;
    return (
      <p>{userGroup.userEmail}</p>
    );
  }
}

export default SingleUserGroup;
