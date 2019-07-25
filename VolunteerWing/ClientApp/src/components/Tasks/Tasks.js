import React from 'react';
import PropTypes from 'prop-types';
import SingleTask from '../SingleTask/SingleTask';
import taskShape from '../../helpers/propz/taskShape';
import './Tasks.scss';

class Tasks extends React.Component {
    static propTypes = {
      tasks: PropTypes.arrayOf(taskShape),
      currentUser: PropTypes.object,
    }

    render() {
      const { tasks, isCreating, createUserTask, currentUser } = this.props;
      const singleTaskComponent = tasks.map(task => (
            <SingleTask
             task = {task}
             key = {task.id}
             isCreating = {isCreating}
             createUserTask = {createUserTask}
             currentUser = {currentUser}
            />
      ));

      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Task</th>
              <th scope="col">Number of People To Signup</th>
              <th scope="col">Availble slots</th>
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
