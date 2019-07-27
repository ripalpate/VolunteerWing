import React from 'react';
import PropTypes from 'prop-types';
import userTaskRequests from '../../helpers/data/userTaskRequests';
import taskShape from '../../helpers/propz/taskShape';
import './SingleTask.scss';

class SingleTask extends React.Component {
  state = {
    isSignup: false,
    isDeleted: false,
  }

    static propTypes = {
      task: taskShape,
      createUserTask: PropTypes.func,
      currentUser: PropTypes.object,
      updateTaskSignup: PropTypes.func,
      isCreating: PropTypes.bool,
      userTask: PropTypes.array,
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

    editEvent = () => {
      const { isEditing, toggleTaskModal } = this.props;
      this.setState({ isEditing: !isEditing });
      toggleTaskModal();
    }

    render() {
      const { task, isCreating } = this.props;
      const { isSignup, isDeleted } = this.state;
      const makeButtons = () => {
        if (isCreating === false && task.numberOfPeopleNeed !== task.numberOfPeopleSignUp && isSignup === false) {
          return (
          <td className="buttons">
            <button className="bttn-pill bttn-success" title="signup" onClick={this.signupEvent}><i className="fas fa-file-contract fa-1x"></i></button>
          </td>
          );
        } if (isCreating === true) {
          return (
          <td className="buttons">
            <button className="bttn-pill bttn-warning" onClick={this.editEvent}><i className="far fa-edit fa-1x"/></button>
            <button className="bttn-pill bttn-danger ml-2"><i className="fas fa-trash fa-1x"></i></button>
          </td>
          );
        } if (isCreating === false && task.numberOfPeopleNeed === task.numberOfPeopleSignUp && isSignup === false && isDeleted === false) {
          return (
            <td className="buttons">
              <button disabled className="bttn-pill bttn-danger" title="full"><i className="fas fa-ban fa-1x fa-diasabled"></i></button>
            </td>
          );
        } if (isCreating === false && isSignup === true) {
          return (
            <td className="buttons">
              <button disabled className="bttn-pill bttn-success" title="signed up"><i className="fas fa-user-check"></i></button>
              <button className="bttn-pill bttn-danger ml-2" title="unassign" onClick={() => { this.removeSignupEvent(); this.changeIsDeletedState(); }}><i className="fas fa-trash fa-1x"></i></button>
            </td>
          );
        } if (isCreating === false && isDeleted === true) {
          return (
          <td className="buttons">
            <button className="bttn-pill bttn-success" title="signup" onClick={this.signupEvent}><i className="fas fa-file-contract fa-1x"></i></button>
          </td>
          );
        }
      };

      return (
        <tr id={task.id}>
            <td>{task.taskName}</td>
            <td>{task.numberOfPeopleNeed}</td>
            <td>{task.numberOfPeopleSignUp} of {task.numberOfPeopleNeed} slots filled</td>
            {makeButtons()}
        </tr>
      );
    }
}

export default SingleTask;
