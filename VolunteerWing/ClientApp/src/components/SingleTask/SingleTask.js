import React from 'react';
import PropTypes from 'prop-types';
import userTaskRequests from '../../helpers/data/userTaskRequests';
import taskShape from '../../helpers/propz/taskShape';
import './SingleTask.scss';

class SingleTask extends React.Component {
  state = {
    isSignup: false,
  }

    static propTypes = {
      task: taskShape,
      createUserTask: PropTypes.func,
      currentUser: PropTypes.object,
      updateTaskSignup: PropTypes.func,
      isCreating: PropTypes.bool,
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

    render() {
      const { task, isCreating } = this.props;
      const { isSignup } = this.state;
      const makeButtons = () => {
        if (isCreating === false && task.numberOfPeopleNeed !== task.numberOfPeopleSignUp && isSignup === false) {
          return (
          <td className="buttons">
            <button className="bttn-pill bttn-success" title="signup" onClick={this.signupEvent}><i className="fas fa-file-contract fa-1x"></i></button>
            <button className="bttn-pill bttn-danger ml-2" title="delete"><i className="fas fa-trash fa-1x"></i></button>
          </td>
          );
        } if (isCreating === true) {
          return (
          <td className="buttons">
            <button className="bttn-pill bttn-warning"><i className="far fa-edit fa-1x"/></button>
            <button className="bttn-pill bttn-danger ml-2"><i className="fas fa-trash fa-1x"></i></button>
          </td>
          );
        } if (isCreating === false && task.numberOfPeopleNeed === task.numberOfPeopleSignUp && isSignup === false) {
          return (
            <td className="buttons">
              <button disabled className="bttn-pill bttn-danger" title="full"><i className="fas fa-ban fa-1x fa-diasabled"></i></button>
              <button className="bttn-pill bttn-danger ml-2" title="delete"><i className="fas fa-trash fa-1x"></i></button>
            </td>
          );
        } if (isCreating === false && isSignup === true) {
          return (
            <td className="buttons">
              <button disabled className="bttn-pill bttn-success" title="signed up"><i className="fas fa-user-check"></i></button>
              <button className="bttn-pill bttn-danger ml-2" title="delete"><i className="fas fa-trash fa-1x"></i></button>
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
