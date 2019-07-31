import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import groupRequests from '../../helpers/data/groupRequests';
import './AddGroupModal.scss';

const defaultGroup = {
  groupName: '',
  adminId: 0,
};

class AddGroupModal extends React.Component {
    state = {
      newGroup: defaultGroup,
    }

    static propTypes = {
      addGroupModal: PropTypes.bool,
      toggleGroupModal: PropTypes.func,
      currentUser: PropTypes.object,
      getAllGroupsByAdminId: PropTypes.func,
    }

    toggleEvent = () => {
      const { toggleGroupModal } = this.props;
      toggleGroupModal();
    }

    formFieldStringState = (name, e) => {
      e.preventDefault();
      const tempGroup = { ...this.state.newGroup };
      tempGroup[name] = e.target.value;
      this.setState({ newGroup: tempGroup });
    }

    nameChange = e => this.formFieldStringState('groupName', e);

    createEvent = (myGroup) => {
      const { toggleGroupModal, getAllGroupsByAdminId } = this.props;
      groupRequests.createGroup(myGroup)
        .then(() => {
          this.setState({ newGroup: defaultGroup }, toggleGroupModal());
          getAllGroupsByAdminId();
        });
    }

    formSubmit = (e) => {
      const currentUser = { ...this.props.currentUser };
      e.preventDefault();
      const myGroup = { ...this.state.newGroup };
      myGroup.adminId = currentUser.id;
      this.createEvent(myGroup);
    }

    render() {
      const { addGroupModal } = this.props;
      const newGroup = { ...this.state.newGroup };
      return (
        <Modal isOpen={addGroupModal} toggle={this.toggleEvent} className="modal-lg">
          <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}>Add Group</ModalHeader>
          <ModalBody className="modal-body">
              <div>
                <div className="form-group row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">Name:</label>
                  <div className="col-sm-10">
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Group name"
                    value= {newGroup.groupName}
                    onChange= {this.nameChange}
                    />
                  </div>
                  <div className ="text-center" onClick={this.formSubmit}>
                    <button className="bttn-pill bttn-success">Add</button>
                  </div>
                </div>
              </div>
          </ModalBody>
        </Modal>
      );
    }
}

export default AddGroupModal;
