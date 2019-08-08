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
      userGroupsData: PropTypes.array,
      deleteEmail: PropTypes.func,
    }

    toggleEvent1 = () => {
      const { toggleMemberModal } = this.props;
      toggleMemberModal();
    }


    render() {
      const { userGroupsData } = this.props;
      const { memberModal, deleteEmail } = this.props;
      const singleUserGroupComponent = userGroupsData.map(userGroup => (
        <SingleUserGroup
            userGroup = {userGroup}
            key = {userGroup.id}
            deleteEmail = {deleteEmail}

        />
      ));
      return (
      <Modal isOpen={memberModal} toggle={this.toggleEvent1} className="modal-lg">
        <ModalHeader className="modal-header header text-center" toggle={this.toggleEvent1}> Members</ModalHeader>
        <ModalBody className="modal-body">
        <div>
            <table className="table borderless table-hover">
              <thead>
                <tr>
                <th scope="col"> Email</th>
                <th scope="col"></th>
                <th></th>
                </tr>
              </thead>
              <tbody>
                {singleUserGroupComponent}
              </tbody>
            </table>
          </div>
        </ModalBody>
      </Modal>
      );
    }
}

export default MemberModal;
