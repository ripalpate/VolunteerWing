import React from 'react';
import PropTypes from 'prop-types';
import Tasks from '../../Tasks/Tasks';
import volunteerEventRequests from '../../../helpers/data/volunteerEventRequests';
import taskRequests from '../../../helpers/data/taskRequests';
import formateDateTime from '../../../helpers/formatDateTime';
import './CreatedEvents.scss';
import userTaskRequests from '../../../helpers/data/userTaskRequests';

class CreatedEvents extends React.Component {
  createdEventMounted = false;

  state = {
    singleEvent: {},
    tasks: [],
    isCreating: false,
    usersTasks: [],
  }

  static propTypes = {
    currentUser: PropTypes.object,
  }

  getsingleEvent = () => {
    const eventId = this.props.match.params.id;
    volunteerEventRequests.getSingleEvent(eventId)
      .then((singleEvent) => {
        this.setState({ singleEvent });
      }).catch(err => console.error(err));
  }

  deleteUserTask= (userTaskId) => {
    userTaskRequests.deleteUserTask(userTaskId)
      .then(() => {
      });
  }

  getAllTasks = () => {
    const eventId = this.props.match.params.id * 1;
    taskRequests.getAllTasks()
      .then((tasks) => {
        const eventRelatedTasks = tasks.filter(task => task.eventId === eventId);
        this.setState({ tasks: eventRelatedTasks });
      });
  }

  getAllUsersTasks = () => {
    userTaskRequests.getAllUsersTasks()
      .then((usersTasks) => {
        this.setState({ usersTasks });
      });
  }

  updateTaskSignUpUponDelete = (taskId, task) => {
    taskRequests.updatePeopleSignupAfterRemoval(taskId, task)
      .then(() => {
        this.getAllTasks();
      });
  }

  updateTaskSignUp = (taskId, task) => {
    taskRequests.updatePeopleSignup(taskId, task)
      .then(() => {
        this.getAllTasks();
      });
  };

  componentDidMount() {
    const { currentUser } = this.props;
    this.createdEventMounted = !!currentUser.id;
    if (this.createdEventMounted) {
      this.getsingleEvent();
      this.getAllTasks();
    }
  }

  componentWillUpdate() {
    this.getAllUsersTasks();
  }

  createUserTask = (newUserTask) => {
    userTaskRequests.createUserTask(newUserTask)
      .then(() => {
      });
  }

  render() {
    const singleEvent = { ...this.state.singleEvent };
    const tasks = [...this.state.tasks];
    const usersTasks = [...this.state.usersTasks];
    const { currentUser } = this.props;
    const { isCreating } = this.state;
    return (
      <div className="created-event form border border-dark rounded w-75 mx-auto p-4">
        <h4 className="event-title">{singleEvent.eventName}</h4>
        <p> {singleEvent.location}</p>
        <p>{singleEvent.description}</p>
        <p>{formateDateTime.formatMDYDate(singleEvent.startDate)}</p>
        <Tasks
        tasks = {tasks}
        currentUser = {currentUser}
        isCreating = {isCreating}
        createUserTask = {this.createUserTask}
        updateTaskSignUp = {this.updateTaskSignUp}
        deleteUserTask = {this.deleteUserTask}
        usersTasks = {usersTasks}
        updateTaskSignUpUponDelete = {this.updateTaskSignUpUponDelete}
        />
      </div>
    );
  }
}

export default CreatedEvents;
