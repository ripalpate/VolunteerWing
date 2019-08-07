import React from 'react';
import PropTypes from 'prop-types';
import userTaskRequests from '../../helpers/data/userTaskRequests';
import formateDateTime from '../../helpers/formatDateTime';
import taskShape from '../../helpers/propz/taskShape';
import './SingleTask.scss';
import TaskFormModal from '../TaskFormModal/TaskFormModal';

class SingleTask extends React.Component {
  state = {
    isSignup: false,
    isDeleted: false,
    isEditing: false,
    taskModal: false,
  }

    static propTypes = {
      task: taskShape,
      createUserTask: PropTypes.func,
      currentUser: PropTypes.object,
      updateTaskSignup: PropTypes.func,
      isCreating: PropTypes.bool,
      usersTasks: PropTypes.array,
      deleteUserTask: PropTypes.func,
      eventId: PropTypes.number,
      deleteTask: PropTypes.func,
      selectedTask: PropTypes.object,
      getSingleTask: PropTypes.func,
      updateTaskSignUpUponDelete: PropTypes.func,
    }

    signupEvent = () => {
      const {
        createUserTask,
        currentUser,
        task,
        updateTaskSignUp,
      } = this.props;

      const myTask = {
        userId: currentUser.id,
        taskId: task.id,
      };
      createUserTask(myTask);
      const taskId = task.id;
      updateTaskSignUp(taskId, task);
      this.checkExistingUserInTask();
    }

    removeSignupEvent = () => {
      const {
        deleteUserTask,
        currentUser,
        task,
        updateTaskSignUpUponDelete,
        usersTasks,
      } = this.props;

      const taskId = task.id;
      const userId = currentUser.id;
      const singleUserTask = usersTasks.filter(userTask => userTask.userId === userId && userTask.taskId === taskId);
      const userTaskId = singleUserTask[0].id;
      deleteUserTask(userTaskId);
      updateTaskSignUpUponDelete(taskId, task);
    }

    deleteSingleTask = () => {
      const { task, deleteTask } = this.props;
      const taskId = task.id;
      deleteTask(taskId);
    }

    componentDidMount() {
      this.checkExistingUserInTask();
    }

    checkExistingUserInTask = () => {
      const { isSignup } = this.state;
      const { currentUser, task } = this.props;
      const taskId = task.id;
      userTaskRequests.getAllUsersTasks()
        .then((usersTasks) => {
          const userExistInUserTask = usersTasks.filter(userTask => userTask.userId === currentUser.id && userTask.taskId === taskId);
          userExistInUserTask.forEach(() => {
            this.setState({ isSignup: !isSignup });
          });
        });
    }

    changeIsDeletedState = () => {
      const { isDeleted } = this.state;
      this.setState({ isSignup: false });
      this.setState({ isDeleted: !isDeleted });
    }

    toggleTaskModal =(e) => {
      const { isEditing, taskModal } = this.state;
      const { getSingleTask } = this.props;
      const task = { ...this.props.task };
      const taskId = task.id * 1;
      if (isEditing) {
        this.setState({ taskModal: !taskModal, isEditing: false });
      }
      this.setState({ taskModal: !taskModal, isEditing: true });
      this.setState({ editId: taskId });
      getSingleTask(taskId);
    }

    render() {
      const { task, isCreating, eventId } = this.props;
      const { isEditing, taskModal } = this.state;
      const { isSignup, isDeleted } = this.state;
      const {
        selectedTask,
      } = this.props;

      const makeButtons = () => {
        if (isCreating === false && task.numberOfPeopleNeed !== task.numberOfPeopleSignUp && isSignup === false) {
          return (
          <td className="buttons">
            <button className="bttn-jelly bttn-success" title="signup" onClick={this.signupEvent}><i className="fas fa-file-contract fa-1x"></i></button>
          </td>
          );
        } if (isCreating === true) {
          return (
          <td className="buttons">
            <button className="bttn-jelly edit" id={task.id} onClick={this.toggleTaskModal} title="Edit"><i className="far fa-edit fa-1x"/></button>
            <button className="bttn-jelly bttn-danger ml-2" onClick = {this.deleteSingleTask} title="Delete"><i className="fas fa-trash fa-1x"></i></button>
            <TaskFormModal
            taskModal = {taskModal}
            isEditing = {isEditing}
            selectedTask = {selectedTask}
            toggleTaskModal = {this.toggleTaskModal}
            eventId = {eventId}
            />
          </td>
          );
        } if (isCreating === false && task.numberOfPeopleNeed === task.numberOfPeopleSignUp && isSignup === false && isDeleted === false) {
          return (
            <td className="buttons">
              <button disabled className="bttn-jelly bttn-danger" title="full"><i className="fas fa-ban fa-1x fa-diasabled"></i></button>
            </td>
          );
        } if (isCreating === false && isSignup === true) {
          return (
            <td className="buttons">
              <button disabled className="bttn-jelly bttn-success" title="Signed up"><i className="fas fa-user-check"></i></button>
              <button className="bttn-jelly bttn-danger ml-2" title="Unassign" onClick={() => { this.removeSignupEvent(); this.changeIsDeletedState(); }}><i className="far fa-times-circle"></i></button>
            </td>
          );
        } if (isCreating === false && isDeleted === true) {
          return (
          <td className="buttons">
            <button className="bttn-jelly bttn-success" title="Signup" onClick={this.signupEvent}><i className="fas fa-file-contract fa-1x"></i></button>
          </td>
          );
        }
      };

      return (
        <tr id={task.id}>
            <td>{task.taskName}</td>
            <td>{formateDateTime.formatMDYDate(task.startDate)}</td>
            <td>{formateDateTime.formatTime(task.startTime)}</td>
            <td>{formateDateTime.formatTime(task.endTime)}</td>
            <td className="text-center">{task.numberOfPeopleNeed}</td>
            <td>{task.numberOfPeopleSignUp} of {task.numberOfPeopleNeed} slots filled</td>
            {makeButtons()}
        </tr>
      );
    }
}

export default SingleTask;
