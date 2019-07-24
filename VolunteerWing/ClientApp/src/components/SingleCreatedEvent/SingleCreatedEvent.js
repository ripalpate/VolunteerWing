import React from 'react';
import PropTypes from 'prop-types';
import formatDateTime from '../../helpers/formatDateTime';
import './SingleCreatedEvent.scss';

class SingleCreatedEvent extends React.Component {
    static propTypes = {
      event: PropTypes.object,
    }

    render() {
      const { event } = this.props;

      return (
        <tr className="createdEvent">
          <td className="event-name">{event.eventName}</td>
          <td className="event-start">{formatDateTime.formatMDYDate(event.startDate)}</td>
          <td className="event-location">{event.location}</td>
      </tr>
      );
    }
}

export default SingleCreatedEvent;
