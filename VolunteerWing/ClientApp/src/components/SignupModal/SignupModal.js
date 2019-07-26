import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import userTaskRequests from '../../helpers/data/userTaskRequests';
import SingleEvent from '../SingleEvent/SingleEvent';
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
  }

  getEventsThatUserSignup = () => {
    const { currentUser } = this.props;
    const userId = currentUser.id;
    userTaskRequests.getAllEventsThatUserSignup(userId)
      .then((events) => {
        const uniqueEvents = [];
        events.forEach((event) => {
          const i = uniqueEvents.findIndex(x => x.eventId === event.EventId);
          if (i <= -1) {
            uniqueEvents.push({
              id: event.id,
              eventName: event.EventName,
              startDate: event.StartDate,
              endTime: event.EndTime,
              location: event.Location,
              eventId: event.EventId,
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
    const { events } = this.state;

    const singleEventComponent = events.map(event => (
      <SingleEvent
       event = {event}
       key = {event.id}
       eventDetailView = {eventDetailView}
      />
    ));
    return (
        <Modal isOpen={viewSignupModal} toggle={this.toggleEvent} className="modal-lg">
        <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}> Sign up Events</ModalHeader>
        <ModalBody className="modal-body">
          <div>
            <table className="table table-hover">
              <thead>
                <tr>
                <th scope="col">Event</th>
                <th scope="col">Start Date</th>
                <th scope="col">Location</th>
                </tr>
              </thead>
              <tbody>
                {singleEventComponent}
              </tbody>
            </table>
          </div>
        </ModalBody>
    </Modal>
    );
  }
}

export default SignupModal;
