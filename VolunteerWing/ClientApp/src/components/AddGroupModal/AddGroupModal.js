import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
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

    render() {
      const { addGroupModal } = this.props;
      const newGroup = { ...this.state.newGroup };
      return (
        <Modal isOpen={addGroupModal} toggle={this.toggleEvent} className="modal-lg">
          <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}>Add Group</ModalHeader>
          <ModalBody className="modal-body">
              <form>
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
                  <div>
                    <button className="bttn-pill bttn-success">Add</button>
                  </div>
                </div>
              </form>
          </ModalBody>
        </Modal>
      );
    }
}

export default AddGroupModal;
