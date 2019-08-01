import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import groupRequests from '../../helpers/data/groupRequests';
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

  componentDidMount() {
    const { currentUser } = this.props;
    this.viewGroupModalMounted = !!currentUser.id;
    if (this.viewGroupModalMounted) {
      this.getGroupsByAdminId();
    }
  }

  render() {
    const { viewGroupModal } = this.props;
    const { groups } = this.state;

    const singleGroupComponent = groups.map(group => (
      <SingleGroup
       group = {group}
       key = {group.id}
      />
    ));

    return (
        <Modal isOpen={viewGroupModal} toggle={this.toggleEvent} className="modal-lg">
        <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}> My Groups</ModalHeader>
        <ModalBody className="modal-body">
          <div>
            <table className="table table-hover">
              <thead>
                <tr>
                <th scope="col">Group Name</th>
                <th scope="col">Members</th>
                <th scope="col"></th>
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
