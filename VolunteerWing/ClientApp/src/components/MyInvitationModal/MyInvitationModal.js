import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import SingleCreatedEvent from '../SingleCreatedEvent/SingleCreatedEvent';
import './MyInvitationModal.scss';
import dbInvitationRequests from '../../helpers/data/dbInvitationRequests';

class MyInvitationModal extends React.Component {
    myInvitationModalMounted = false;

    static propTypes = {
      myInvitationModal: PropTypes.bool,
      toggleMyInvitationModal: PropTypes.func,
      currentUser: PropTypes.object,
    }

    state = {
      invitedEvents: [],
    }

    getAllInvitationsWithEventInfo = () => {
      const { currentUser } = this.props;
      dbInvitationRequests.getAllInvitationsWithEventInfo()
        .then((invitationsWithEvent) => {
          const getInvitationsForCurrentUser = invitationsWithEvent.filter(x => x.UserEmail === currentUser.email);
          const invitedEvents = [];
          getInvitationsForCurrentUser.forEach((invitation) => {
            invitedEvents.push({
              eventName: invitation.EventName,
              startDate: invitation.StartDate,
              endTime: invitation.EndTime,
              startTime: invitation.StartTime,
              location: invitation.Location,
              id: invitation.EventId,
            });
          });
          this.setState({ invitedEvents });
        });
    }

    componentDidMount() {
      const { currentUser } = this.props;
      this.myInvitationModalMounted = !!currentUser.id;
      if (this.myInvitationModalMounted) {
        this.getAllInvitationsWithEventInfo();
      }
    }

    componentWillUnmount() {
      this.myInvitationModalMounted = false;
    }

    toggleEvent = () => {
      const { toggleMyInvitationModal } = this.props;
      toggleMyInvitationModal();
    }

    render() {
      const { myInvitationModal, eventDetailView } = this.props;
      const invitedEvents = [...this.state.invitedEvents];
      const singleInvitedEventComponent = invitedEvents.map(invitedEvent => (
        <SingleCreatedEvent
         event = {invitedEvent}
         key = {invitedEvent.id}
         eventDetailView = {eventDetailView}
        />
      ));
      return (
          <Modal isOpen={myInvitationModal} toggle={this.toggleEvent} className="modal-lg">
            <ModalHeader className="modal-header text-center" toggle={this.toggleEvent}>My Invitations</ModalHeader>
            <ModalBody className="modal-body">
              <div>
                <table className="table table-hover">
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
                    {singleInvitedEventComponent}
                  </tbody>
                </table>
              </div>
            </ModalBody>
          </Modal>
      );
    }
}

export default MyInvitationModal;
