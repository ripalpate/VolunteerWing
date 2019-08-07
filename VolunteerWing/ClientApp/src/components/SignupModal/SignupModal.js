import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import userTaskRequests from '../../helpers/data/userTaskRequests';
import SingleCreatedEvent from '../SingleCreatedEvent/SingleCreatedEvent';
import './SignupModal.scss';

class SignupModal extends React.Component {
  viewSignupModalMounted = false;

  static propTypes = {
    toggleViewSignupModal: PropTypes.func,
    viewSignupModal: PropTypes.bool,
    currentUser: PropTypes.object,
    eventDetailView: PropTypes.func,
  }

  state = {
    events: [],
    isSignupView: true,
  }

  getEventsThatUserSignup = () => {
    const { currentUser } = this.props;
    const userId = currentUser.id;
    userTaskRequests.getAllEventsThatUserSignup(userId)
      .then((events) => {
        const uniqueEvents = [];
        events.forEach((event) => {
          const i = uniqueEvents.findIndex(x => x.id === event.id);
          if (i <= -1) {
            uniqueEvents.push({
              userTaskid: event.UserTaskId,
              eventName: event.EventName,
              startDate: event.StartDate,
              startTime: event.StartTime,
              endTime: event.EndTime,
              location: event.Location,
              id: event.id,
            });
          }
        });
        this.setState({ events: uniqueEvents });
      });
  }

  toggleEvent = () => {
    const { toggleViewSignupModal } = this.props;
    toggleViewSignupModal();
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.viewSignupModalMounted = !!currentUser.id;
    if (this.viewSignupModalMounted) {
      this.getEventsThatUserSignup();
    }
  }

  render() {
    const { viewSignupModal, eventDetailView } = this.props;
    const { events, isSignupView } = this.state;

    const singleEventComponent = events.map(event => (
      <SingleCreatedEvent
       event = {event}
       key = {event.userTaskid}
       eventDetailView = {eventDetailView}
       isSignupView = {isSignupView}
      />
    ));
    const checkLength = () => {
      if (events.length === 0) {
        return (
          <div className="w-75 mx-auto">
            <div>Sorry, currently, you haven't signed up for any event</div>
          </div>
        );
      } return (
          <table className="table borderless table-hover">
            <thead>
              <tr>
                <th scope="col">Event</th>
                <th scope="col">Start Date</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            <tbody>
            {singleEventComponent}
            </tbody>
          </table>
      );
    };

    return (
        <Modal isOpen={viewSignupModal} toggle={this.toggleEvent} className="modal-lg">
        <ModalHeader className="modal-header text-center header" toggle={this.toggleEvent}>My Signups</ModalHeader>
        <ModalBody className="modal-body">
          <div>
            {checkLength()}
          </div>
        </ModalBody>
    </Modal>
    );
  }
}

export default SignupModal;
