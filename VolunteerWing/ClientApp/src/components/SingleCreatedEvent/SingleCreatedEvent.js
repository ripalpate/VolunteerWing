import React from 'react';
import PropTypes from 'prop-types';
import formatDateTime from '../../helpers/formatDateTime';
import './SingleCreatedEvent.scss';


class SingleCreatedEvent extends React.Component {
  static propTypes = {
    event: PropTypes.object,
    eventDetailView: PropTypes.func,
    isEditingEvent: PropTypes.bool,
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
    const { event } = this.props;

    return (
    <tr className="createdEvent">
      <td className="event-name" onClick={this.changeEventToDetailView}>{event.eventName}</td>
      <td className="event-start" onClick={this.changeEventToDetailView}>{formatDateTime.formatMDYDate(event.startDate)}</td>
      <td className="event-location" onClick={this.changeEventToDetailView}>{event.location}</td>
      <td><button className= "bttn-pill bttn-warning" data-event-id={event.id} onClick={this.editEvent}>Edit</button></td>
    </tr>
    );
  }
}

export default SingleCreatedEvent;
