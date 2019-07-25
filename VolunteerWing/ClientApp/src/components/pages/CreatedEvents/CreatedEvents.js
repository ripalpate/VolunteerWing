import React from 'react';
import PropTypes from 'prop-types';
import Tasks from '../../Tasks/Tasks';
import volunteerEventRequests from '../../../helpers/data/volunteerEventRequests';
import taskRequests from '../../../helpers/data/taskRequests';
import formateDateTime from '../../../helpers/formatDateTime';
import './CreatedEvents.scss';

class CreatedEvents extends React.Component {
  createdEventMounted = false;

  state = {
    singleEvent: {},
    tasks: [],
    isCreating: false,
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

  getAllTasks = () => {
    const eventId = this.props.match.params.id * 1;
    taskRequests.getAllTasks()
      .then((tasks) => {
        const eventRelatedTasks = tasks.filter(task => task.eventId === eventId);
        this.setState({ tasks: eventRelatedTasks });
      });
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.createdEventMounted = !!currentUser.id;
    if (this.createdEventMounted) {
      this.getsingleEvent();
      this.getAllTasks();
    }
  }

  render() {
    const singleEvent = { ...this.state.singleEvent };
    const tasks = [...this.state.tasks];
    const { currentUser } = this.props;
    const { isCreating } = this.state;
    return (
      <div className="w-75 mx-auto pt-3">
      <h4>Event Name:{singleEvent.eventName}</h4>
      <p>Location: {singleEvent.location}</p>
      <p>Description: {singleEvent.description}</p>
      <p>Start Date: {formateDateTime.formatMDYDate(singleEvent.startDate)}</p>
      <p>Strat Time: {formateDateTime.formatTime(singleEvent.startTime)}</p>
      <Tasks
       tasks = {tasks}
       currentUser = {currentUser}
       isCreating = {isCreating}
      />
  </div>
    );
  }
}

export default CreatedEvents;
