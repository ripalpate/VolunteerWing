import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import './AddGroupModal.scss';

class AddGroupModal extends React.Component {
    static propTypes = {
      addGroupModal: PropTypes.bool,
      toggleGroupModal: PropTypes.func,
      currentUser: PropTypes.object,
    }

    toggleEvent = () => {
      const { toggleGroupModal } = this.props;
      toggleGroupModal();
    }

    render() {
      const { addGroupModal } = this.props;
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
                    // value= {newGroup.groupName}
                    // onChange= {this.nameChange}
                    />
                  </div>
                </div>
              </form>
          </ModalBody>
        </Modal>
      );
    }
}

export default AddGroupModal;
