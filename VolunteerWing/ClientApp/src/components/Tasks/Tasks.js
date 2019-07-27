import React from 'react';
import PropTypes from 'prop-types';
import SingleTask from '../SingleTask/SingleTask';
import taskShape from '../../helpers/propz/taskShape';
import './Tasks.scss';

class Tasks extends React.Component {
    static propTypes = {
      tasks: PropTypes.arrayOf(taskShape),
      currentUser: PropTypes.object,
      createUserTask: PropTypes.func,
      updateTaskSignup: PropTypes.func,
      isCreating: PropTypes.bool,
      deleteUserTask: PropTypes.func,
    }

    render() {
      const {
        tasks,
        isCreating,
        createUserTask,
        currentUser,
        updateTaskSignUp,
        deleteUserTask,
        usersTasks,
        updateTaskSignUpUponDelete,
      } = this.props;

      const singleTaskComponent = tasks.map(task => (
            <SingleTask
             task = {task}
             key = {task.id}
             isCreating = {isCreating}
             createUserTask = {createUserTask}
             currentUser = {currentUser}
             updateTaskSignUp = {updateTaskSignUp}
             deleteUserTask = {deleteUserTask}
             usersTasks = {usersTasks}
             updateTaskSignUpUponDelete = {updateTaskSignUpUponDelete}
            />
      ));

      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Available Slots</th>
              <th scope="col">Filled slots</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {singleTaskComponent}
          </tbody>
        </table>
      );
    }
}

export default Tasks;
