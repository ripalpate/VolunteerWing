import React from 'react';
import PropTypes from 'prop-types';
import Tasks from '../../Tasks/Tasks';
import volunteerEventRequests from '../../../helpers/data/volunteerEventRequests';
import taskRequests from '../../../helpers/data/taskRequests';
import formateDateTime from '../../../helpers/formatDateTime';
import './CreatedEvents.scss';
import userTaskRequests from '../../../helpers/data/userTaskRequests';
import userRequests from '../../../helpers/data/userRequests';

class CreatedEvents extends React.Component {

  state = {
    singleEvent: {},
    tasks: [],
    isCreating: false,
    usersTasks: [],
    createdEventMounted: false,
    admin: [],
  }

  static propTypes = {
    currentUser: PropTypes.object,
  }

  getAdminInfo = () => {
    const { singleEvent } = this.state;
    userRequests.getAllUsers()
      .then((usrs) => {
        const getAdmin = usrs.find(user => user.id === singleEvent.adminId);
        this.setState({ admin: getAdmin });
      });
  }

  getsingleEvent = () => {
    const eventId = this.props.match.params.id;
    volunteerEventRequests.getSingleEvent(eventId)
      .then((singleEvent) => {
        this.setState({ singleEvent });
      }).then(() => {
        this.getAdminInfo();
      }).catch(err => console.error(err));
  }

  deleteUserTask= (userTaskId) => {
    return userTaskRequests.deleteUserTask(userTaskId)
      .then(this.getAllTasks);
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
    if (currentUser.id !== undefined) {
      this.getsingleEvent();
      this.getAllUsersTasks();
      this.getAllTasks();
    }
  }

  createUserTask = (newUserTask) => {
    return userTaskRequests.createUserTask(newUserTask)
      .then(this.getAllUsersTasks);
  }

  render() {
    const singleEvent = { ...this.state.singleEvent };
    const tasks = [...this.state.tasks];
    const usersTasks = [...this.state.usersTasks];
    const { currentUser } = this.props;
    const { isCreating, admin } = this.state;
    return (
      <div className="row created-event form border border-dark rounded mx-auto p-4">
        <div className="col-7">
          <h4 className="event-title">{singleEvent.eventName}</h4>
          <p> {singleEvent.location}</p>
          <p>{singleEvent.description}</p>
          <p>{formateDateTime.formatMDYDate(singleEvent.startDate)}</p>
        </div>
        <div className="col-5 organizer-info">
          <h4 className="event-title">Organizer Information</h4>
          <p>Name: {admin.name}</p>
          <p>Email:<a href={"mailto:" + admin.email} className="organizer"> {admin.email}</a></p>
        </div>
        <div className="col-12">
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
      </div>
    );
  }
}

export default CreatedEvents;
