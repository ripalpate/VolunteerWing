import React from 'react';
import PropTypes from 'prop-types';
import formatDateTime from '../../helpers/formatDateTime';
import './SingleEvent.scss';

class SingleEvent extends React.Component {
    static propTypes = {
      event: PropTypes.object,
      eventDetailView: PropTypes.func,
    }

    changeEventToDetailView = (e) => {
      e.preventDefault();
      const { eventDetailView, event } = this.props;
      eventDetailView(event.eventId);
    }

    render() {
      const { event } = this.props;

      return (
        <tr className="createdEvent" onClick={this.changeEventToDetailView}>
          <td className="event-name">{event.eventName}</td>
          <td className="event-start">{formatDateTime.formatMDYDate(event.startDate)}</td>
          <td className="event-location">{event.location}</td>
        </tr>
      );
    }
}

export default SingleEvent;