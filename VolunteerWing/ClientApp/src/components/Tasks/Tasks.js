import React from 'react';
import PropTypes from 'prop-types';
import SingleTask from '../SingleTask/SingleTask';
import taskShape from '../../helpers/propz/taskShape';
import './Tasks.scss';

class Tasks extends React.Component {
    static propTypes = {
      tasks: PropTypes.arrayOf(taskShape),
    }

    render() {
      const { tasks } = this.props;
      const singleTaskComponent = tasks.map(task => (
            <SingleTask
             task = {task}
             key = {task.id}
            />
      ));

      const checkLength = () => {
        if (tasks.length !== 0) {
          return (
            <button className="bttn-pill bttn-success text-center">Send Invitations</button>
          );
        } return (
            <span></span>
        );
      };

      return (
        <div>
          <div>
            {singleTaskComponent}
          </div>
          <div>{checkLength()}</div>
        </div>
      );
    }
}

export default Tasks;
