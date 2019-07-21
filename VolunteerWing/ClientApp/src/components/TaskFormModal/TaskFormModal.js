import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';


class TaskFormModal extends React.Component {
    static propTypes = {
      toggleTaskModal: PropTypes.func,
      taskModal: PropTypes.bool,

    }

    toggleEvent = () => {
      const { toggleTaskModal } = this.props;
      toggleTaskModal();
    }

    render() {
      const { taskModal } = this.props;
      return (
            <div>
                <Modal isOpen={taskModal} toggle={this.toggleEvent} className="modal-lg">
                    <ModalHeader className="modal-header" toggle={this.toggleEvent}>Achtung!!!</ModalHeader>
                    <ModalBody className="text-center modal-body warning-modal">
                    </ModalBody>
                </Modal>
            </div>
      );
    }
}

export default TaskFormModal;
