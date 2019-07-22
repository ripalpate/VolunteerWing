import React from 'react';
import './MyEvent.scss';
import volunteerEventRequests from '../../../helpers/data/volunteerEventRequests';
import formateDateTime from '../../../helpers/formatDateTime';
import TaskFormModal from '../../TaskFormModal/TaskFormModal';
import taskRequests from '../../../helpers/data/taskRequests';

class MyEvent extends React.Component {
    state = {
      singleEvent: {},
      taskModal: false,
      tasks: [],
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

    toggleTaskModal = () => {
      const { taskModal } = this.state;
      this.setState({ taskModal: !taskModal });
    }

    componentDidMount() {
      this.getsingleEvent();
      this.getAllTasks();
    }

    render() {
      const singleEvent = { ...this.state.singleEvent };
      const { currentUser } = this.props;
      const { taskModal } = this.state;
      return (
        <div>
            <h4>Event Name:{singleEvent.eventName}</h4>
            <p>Location: {singleEvent.location}</p>
            <p>Description: {singleEvent.description}</p>
            <p>Start Date: {formateDateTime.formatMDYDate(singleEvent.startDate)}</p>
            <p>Strat Time: {formateDateTime.formatTime(singleEvent.startTime)}</p>
            <button className="bttn-pill bttn-info" onClick={this.toggleTaskModal}>Add Tasks</button>
            <TaskFormModal
             currentUser={currentUser}
             taskModal = {taskModal}
             toggleTaskModal={this.toggleTaskModal}
             eventId = {this.props.match.params.id * 1}
            />
        </div>
      );
    }
}

export default MyEvent;
