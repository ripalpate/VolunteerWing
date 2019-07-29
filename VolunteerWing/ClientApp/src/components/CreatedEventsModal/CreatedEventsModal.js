import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import SingleCreatedEvent from '../SingleCreatedEvent/SingleCreatedEvent';
import './CreatedEventsModal.scss';
import volunteerEventRequests from '../../helpers/data/volunteerEventRequests';

class CreatedEventsModal extends React.Component {
    createdEventsModalMounted = false;

    state = {
      events: [],
    }

    static propTypes = {
      toggleCreatedEventsModal: PropTypes.func,
      createdEventsModal: PropTypes.bool,
      currentUser: PropTypes.object,
      eventDetailView: PropTypes.func,
    }

    toggleEvent = () => {
      const { toggleCreatedEventsModal } = this.props;
      toggleCreatedEventsModal();
    }

    getAllEventsAssociatedToAdmin = () => {
      const { currentUser } = this.props;
      volunteerEventRequests.getAllEvents()
        .then((allEvents) => {
          const eventsAssociatedWithAdmin = allEvents.filter(event => event.adminId === currentUser.id);
          this.setState({ events: eventsAssociatedWithAdmin });
        });
    }

    componentDidMount() {
      const { currentUser } = this.props;
      this.createdEventsModalMounted = !!currentUser.id;
      if (this.createdEventsModalMounted) {
        this.getAllEventsAssociatedToAdmin();
      }
    }


    render() {
      const { createdEventsModal, eventDetailView, routeToAddEditEvent, passEventToEdit } = this.props;
      const { events } = this.state;

      const singleEventComponent = events.map(event => (
        <SingleCreatedEvent
         event = {event}
         key = {event.id}
         eventDetailView = {eventDetailView}
         routeToAddEditEvent = {routeToAddEditEvent}
         passEventToEdit = {passEventToEdit }
        />
      ));

      return (
        <Modal isOpen={createdEventsModal} toggle={this.toggleEvent} className="modal-lg">
            <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}> Created Events</ModalHeader>
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

export default CreatedEventsModal;
