import React from 'react';
import PropTypes from 'prop-types';
import './MyEvent.scss';
import volunteerEventRequests from '../../../helpers/data/volunteerEventRequests';
import groupRequests from '../../../helpers/data/groupRequests';
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
      groups: [],
    }

    static propTypes = {
      currentUser: PropTypes.object,
    }

    getSingleTask = (taskId) => {
      taskRequests.getSingleTask(taskId)
        .then((singleTask) => {
          const modifySingleTask = Object.assign({}, singleTask, { startDate: new Date(singleTask.startDate), startTime: new Date(singleTask.startTime), endTime: new Date(singleTask.endTime) });
          this.setState({
            selectedTask: modifySingleTask,
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

    getAllGroups = () => {
      groupRequests.getAllGroups()
        .then((groups) => {
          this.setState({ groups });
        });
    }

    toggleTaskModal = () => {
      const { taskModal, singleEvent } = this.state;
      this.setState({ taskModal: !taskModal, startDate: singleEvent.startDate });
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
                <p>Start Time: {formateDateTime.formatTime(singleEvent.startTime)}</p>
                <button className="bttn-pill bttn-success mb-3" onClick={ this.toggleTaskModal}>Add Tasks</button>
                <TaskFormModal
                  taskModal = {taskModal}
                  toggleTaskModal={this.toggleTaskModal}
                  eventId = {this.props.match.params.id * 1}
                  isEditing = {isEditing}
                  startDate = {new Date(singleEvent.startDate)}
                />
                <Tasks
                  tasks = {tasks}
                  currentUser = {currentUser}
                  isCreating = {isCreating}
                  eventId = {eventId}
                  deleteTask = {this.deleteTask}
                  getSingleTask = {this.getSingleTask}
                  selectedTask = {selectedTask}
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
