import React from 'react';
import PropTypes from 'prop-types';
import SingleTask from '../SingleTask/SingleTask';
import SingleCreatedTask from '../SingleCreatedTask/SingleCreatedTask';
import taskShape from '../../helpers/propz/taskShape';
import './Tasks.scss';

class Tasks extends React.Component {
    static propTypes = {
      tasks: PropTypes.arrayOf(taskShape),
      currentUser: PropTypes.object,
    }

    render() {
      const { tasks, isCreating } = this.props;
      const singleTaskComponent = tasks.map(task => (
            <SingleTask
             task = {task}
             key = {task.id}
            />
      ));

      const singleCreatedTaskComponent = tasks.map(task => (
        <SingleCreatedTask
         task = {task}
         key = {task.id}
        />
      ));

      const renderSingleCreatedTask = () => {
        if (isCreating === true) {
          return (
              <div>
               {singleTaskComponent}</div>
          );
        } if (isCreating === false) {
          return (
          <div>
           {singleCreatedTaskComponent}
            </div>
          );
        }
      };
      return (
          <div>
            {renderSingleCreatedTask()}
          </div>
      );
    }
}

export default Tasks;
