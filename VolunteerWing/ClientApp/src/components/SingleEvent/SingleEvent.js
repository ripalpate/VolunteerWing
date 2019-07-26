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
      eventDetailView(event.EventId);
    }

    render() {
      const { event } = this.props;

      return (
        <tr className="createdEvent" onClick={this.changeEventToDetailView}>
          <td className="event-name">{event.EventName}</td>
          <td className="event-start">{formatDateTime.formatMDYDate(event.StartDate)}</td>
          <td className="event-location">{event.Location}</td>
        </tr>
      );
    }
}

export default SingleEvent;