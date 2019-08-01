import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import SingleUserGroup from '../SingleUserGroup/SingleUserGroup';

class MemberModal extends React.Component {
    static propTypes = {
      toggleMemberModal: PropTypes.func,
      memberModal: PropTypes.bool,
      userGroups: PropTypes.array,
    }

    toggleEvent1 = () => {
      const { toggleMemberModal } = this.props;
      toggleMemberModal();
    }


    render() {
      const { userGroupsData } = this.props;
      const { memberModal } = this.props;
      const singleUserGroupComponent = userGroupsData.map(userGroup => (
        <SingleUserGroup
            userGroup = {userGroup}
            key = {userGroup.id}
        />
      ));
      return (
      <Modal isOpen={memberModal} toggle={this.toggleEvent1} className="modal-lg">
        <ModalHeader className="modal-header text-center" toggle={this.toggleEvent1}> Members</ModalHeader>
        <ModalBody className="modal-body">
          <div>{singleUserGroupComponent}</div>
        </ModalBody>
      </Modal>
      );
    }
}

export default MemberModal;
