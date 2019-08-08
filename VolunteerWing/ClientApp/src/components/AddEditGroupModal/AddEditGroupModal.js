import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import groupRequests from '../../helpers/data/groupRequests';
import './AddEditGroupModal.scss';

const defaultGroup = {
  groupName: '',
  adminId: 0,
};

class AddEditGroupModal extends React.Component {
    state = {
      newGroup: defaultGroup,
    }

    static propTypes = {
      addEditGroupModal: PropTypes.bool,
      toggleGroupModal: PropTypes.func,
      currentUser: PropTypes.object,
      getAllGroupsByAdminId: PropTypes.func,
      isEditing: PropTypes.bool,
      getGroupsByAdminId: PropTypes.func,
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
      const { isEditing, toggleGroupModal, getGroupsByAdminId } = this.props;
      e.preventDefault();
      const myGroup = { ...this.state.newGroup };
      myGroup.adminId = currentUser.id;
      if (isEditing) {
        groupRequests.updateGroup(myGroup.id, myGroup)
          .then(() => {
            this.setState({ newGroup: defaultGroup }, toggleGroupModal());
            getGroupsByAdminId();
          });
      } else {
        this.createEvent(myGroup);
      }
    }

    componentWillReceiveProps(newProps) {
      const { isEditing, group } = newProps;
      if (isEditing) {
        this.setState({ newGroup: group });
      }
    }

    render() {
      const { addEditGroupModal, isEditing } = this.props;
      const newGroup = { ...this.state.newGroup };

      const makeHeader = () => {
        if (isEditing) {
          return (
            <div className="header">Edit My Group</div>
          );
        }
        return (
          <div className="header">Add Group</div>
        );
      };

      const makeButton = () => {
        if (isEditing) {
          return (
            <div className="mx-auto">
              <button className="bttn-jelly edit mt-2" title="Save Changes">
                <i className="fas fa-check-circle pr-2"/> Save
              </button>
            </div>
          );
        } return (
          <div className="mx-auto">
            <button className="bttn-jelly bttn-success mt-2" title="Add Group">
              <i className="fas fa-plus-circle pr-2" /> Add
            </button>
          </div>
        );
      };

      return (
        <Modal isOpen={addEditGroupModal} toggle={this.toggleEvent} className="modal-lg">
          <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}>{makeHeader()}</ModalHeader>
          <ModalBody className="modal-body">
              <div className="w-75 mx-auto">
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
                  <div className ="mx-auto mt-2" onClick={this.formSubmit}>
                    {makeButton()}
                  </div>
                </div>
              </div>
          </ModalBody>
        </Modal>
      );
    }
}

export default AddEditGroupModal;
