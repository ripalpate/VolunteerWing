import React from 'react';
import PropTypes from 'prop-types';
import formatDateTime from '../../helpers/formatDateTime';
import './SingleCreatedEvent.scss';


class SingleCreatedEvent extends React.Component {
  static propTypes = {
    event: PropTypes.object,
    eventDetailView: PropTypes.func,
    isEditingEvent: PropTypes.bool,
    currentUser: PropTypes.object,
    isSignupView: PropTypes.bool,
  }

  changeEventToDetailView = (e) => {
    e.preventDefault();
    const { eventDetailView, event } = this.props;
    eventDetailView(event.id);
  }

  editEvent = () => {
    const { passEventToEdit, routeToAddEditEvent } = this.props;
    const eventId = this.props.event.id * 1;
    passEventToEdit(eventId);
    routeToAddEditEvent();
  }

  render() {
    const { event, isSignupView } = this.props;

    const makeEditButton = () => {
      if (isSignupView === false) {
        return (
          <button className= "bttn-pill bttn-warning" data-event-id={event.id} onClick={this.editEvent}>Edit</button>
        );
      } return (
        <span></span>
      );
    };
    return (
    <tr className="createdEvent table-row">
      <td className="event-name" onClick={this.changeEventToDetailView}>{event.eventName}</td>
      <td className="event-start" onClick={this.changeEventToDetailView}>{formatDateTime.formatMDYDate(event.startDate)}</td>
      <td className="event-startTime" onClick={this.changeEventToDetailView}>{formatDateTime.formatTime(event.startTime)}</td>
      <td className="event-endTime" onClick={this.changeEventToDetailView}>{formatDateTime.formatTime(event.endTime)}</td>
      <td className="event-location" onClick={this.changeEventToDetailView}>{event.location}</td>
      <td>{makeEditButton()}</td>
    </tr>
    );
  }
}

export default SingleCreatedEvent;
