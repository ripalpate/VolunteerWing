import React from 'react';
import PropTypes from 'prop-types';
import './MyEvent.scss';
import volunteerEventRequests from '../../../helpers/data/volunteerEventRequests';
import formateDateTime from '../../../helpers/formatDateTime';
import TaskFormModal from '../../TaskFormModal/TaskFormModal';
import taskRequests from '../../../helpers/data/taskRequests';
import Tasks from '../../Tasks/Tasks';
import InvitationModal from '../../InvitationModal/InvitationModal';

class MyEvent extends React.Component {
    myEventMounted = false;

    state = {
      singleEvent: {},
      taskModal: false,
      tasks: [],
      invitationModal: false,
      isCreating: true,
      isEditing: false,
      selectedTask: {},
      eventId: 0,
      startDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
    }

    static propTypes = {
      currentUser: PropTypes.object,
    }

    getSingleTask = (taskId) => {
      taskRequests.getSingleTask(taskId)
        .then((singleTask) => {
          this.setState({
            selectedTask: singleTask,
            startDate: new Date(singleTask.startDate),
            startTime: new Date(singleTask.startTime),
            endTime: new Date(singleTask.endTime),
          });
        });
    }

    getsingleEvent = () => {
      const eventId = this.props.match.params.id * 1;
      volunteerEventRequests.getSingleEvent(eventId)
        .then((singleEvent) => {
          this.setState({ singleEvent, eventId });
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
      const { currentUser } = this.props;
      this.myEventMounted = !!currentUser.id;
      if (this.myEventMounted) {
        this.getsingleEvent();
      }
    }

    componentWillUpdate() {
      const { currentUser } = this.props;
      this.myEventMounted = !!currentUser.id;
      if (this.myEventMounted) {
        this.getAllTasks();
      }
    }

    componentWillUnmount() {
      this.myEventMounted = false;
    }

    toggleInvitationModal = () => {
      const { invitationModal } = this.state;
      this.setState({ invitationModal: !invitationModal });
    }

    routeToCreatedEvents = () => {
      const { singleEvent } = this.state;
      const eventId = singleEvent.id * 1;
      this.props.history.push(`/createdEvent/${eventId}`);
    }

    deleteTask = (taskId) => {
      taskRequests.deleteTask(taskId)
        .then(() => {
          this.getAllTasks();
        });
    }

    render() {
      const singleEvent = { ...this.state.singleEvent };
      const {
        taskModal,
        invitationModal,
        isCreating,
        isEditing,
        eventId,
        startDate,
        startTime,
        endTime,
      } = this.state;
      const tasks = [...this.state.tasks];
      const selectedTask = { ...this.state.selectedTask };
      const { currentUser } = this.props;

      const adminViewForThePage = () => {
        if (currentUser.isAdmin) {
          return (
            <div className="w-75 mx-auto pt-3">
                <h4>Event Name:{singleEvent.eventName}</h4>
                <p>Location: {singleEvent.location}</p>
                <p>Description: {singleEvent.description}</p>
                <p>Start Date: {formateDateTime.formatMDYDate(singleEvent.startDate)}</p>
                <p>Strat Time: {formateDateTime.formatTime(singleEvent.startTime)}</p>
                <button className="bttn-pill bttn-success mb-3" onClick={ this.toggleTaskModal}>Add Tasks</button>
                <TaskFormModal
                  taskModal = {taskModal}
                  toggleTaskModal={this.toggleTaskModal}
                  eventId = {this.props.match.params.id * 1}
                  isEditing = {isEditing}
                />
                <Tasks
                  tasks = {tasks}
                  currentUser = {currentUser}
                  isCreating = {isCreating}
                  eventId = {eventId}
                  deleteTask = {this.deleteTask}
                  getSingleTask = {this.getSingleTask}
                  selectedTask = {selectedTask}
                  startDate= {startDate}
                  startTime = {startTime}
                  endTime = {endTime}
                />
            </div>
          );
        } return (
            <div className="text-center">
              <h4>404</h4>
              <h6>Oopsss!!! This isn't good</h6>
              <p>Seems like you got lost</p>
            </div>
        );
      };

      const checkLength = () => {
        if (tasks.length !== 0) {
          return (
            <div className="w-75 mx-auto">
              <button className="bttn-pill bttn-success text-center" onClick={this.toggleInvitationModal}>Send Invitations
              </button>
            </div>
          );
        } return (
            <span></span>
        );
      };

      return (
       <div className="w-75 mx-auto pt-5">
           {adminViewForThePage()}
           {checkLength()}
           <InvitationModal
            invitationModal = {invitationModal}
            currentUser = {currentUser}
            toggleInvitationModal = {this.toggleInvitationModal}
            routeToCreatedEvents = {this.routeToCreatedEvents}
            singleEvent= {singleEvent}
          />
       </div>
      );
    }
}

export default MyEvent;
