import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import taskRequests from '../../helpers/data/taskRequests';
import './TaskFormModal.scss';

const defaultTask = {
  taskName: '',
  comment: '',
  numberOfPeopleNeed: 0,
  eventId: 0,
};

class TaskFormModal extends React.Component {
    state = {
      newTask: defaultTask,
    }

    static propTypes = {
      toggleTaskModal: PropTypes.func,
      taskModal: PropTypes.bool,
      eventId: PropTypes.number,
      isEditing: PropTypes.bool,
      task: PropTypes.object,
    }

    toggleEvent = () => {
      const { toggleTaskModal } = this.props;
      toggleTaskModal();
    }

    formFieldStringState = (name, e) => {
      e.preventDefault();
      const tempTask = { ...this.state.newTask };
      tempTask[name] = e.target.value;
      this.setState({ newTask: tempTask });
    }

    formFieldNumberState = (name, e) => {
      e.preventDefault();
      const tempTask = { ...this.state.newTask };
      tempTask[name] = e.target.value * 1;
      this.setState({ newTask: tempTask });
    }

    taskNameChange = e => this.formFieldStringState('taskName', e);

    commentChange = e => this.formFieldStringState('comment', e);

    numberOFPeopleNeedChange = e => this.formFieldNumberState('numberOfPeopleNeed', e);

    formSubmit = (e) => {
      const { eventId, toggleTaskModal, isEditing } = this.props;
      e.preventDefault();
      const myTask = { ...this.state.newTask };
      myTask.eventId = eventId;
      if (isEditing) {
        taskRequests.updateTask(myTask.id, myTask)
          .then(() => {
            this.setState({ newTask: defaultTask }, toggleTaskModal());
          });
      } else {
        taskRequests.createTask(myTask)
          .then(() => {
            this.setState({ newTask: defaultTask }, toggleTaskModal());
          }).catch(err => console.error(err));
      }
    }

    componentWillReceiveProps(props) {
      const { isEditing, task } = props;
      if (isEditing) {
        this.setState({ newTask: task });
      }
    }

    render() {
      const { taskModal } = this.props;
      const { newTask } = this.state;
      return (
        <div>
            <Modal isOpen={taskModal} toggle={this.toggleEvent} className="modal-lg">
                <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}>Add Task</ModalHeader>
                <ModalBody className="modal-body">
                    <form className= "task-modal-form" onSubmit={this.formSubmit}>
                        <div className="form-group row">
                            <label htmlFor="taskName" className="col-sm-2 col-form-label">Task Name:</label>
                            <div className="col-sm-10">
                                <input
                                type="text"
                                className="form-control"
                                id="taskName"
                                placeholder="Task Name"
                                value= {newTask.taskName}
                                onChange= {this.taskNameChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="helpComment" className="col-sm-2 col-form-label">Comment</label>
                            <div className="col-sm-10">
                                <input
                                type="text"
                                className="form-control"
                                id="comment"
                                placeholder="Type help comment"
                                value= {newTask.comment}
                                onChange= {this.commentChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="peopleNeed" className="col-sm-2 col-form-label">Number of People Need</label>
                            <div className="col-sm-10">
                                <input
                                className="form-control"
                                id="numberOfPeopleNeed"
                                placeholder="10"
                                value= {newTask.numberOfPeopleNeed}
                                onChange= {this.numberOFPeopleNeedChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-10 text-center">
                                <button type="submit" className="bttn-pill bttn-success">Save</button>
                            </div>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
      );
    }
}

export default TaskFormModal;
