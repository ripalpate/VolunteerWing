import React from 'react';
import './MyEvent.scss';
import volunteerEventRequests from '../../../helpers/data/volunteerEventRequests';

class MyEvent extends React.Component {
    state = {
      singleEvent: {},
    }

    getsingleEvent = () => {
      const eventId = this.props.match.params.id;
      volunteerEventRequests.getSingleEvent(eventId)
        .then((singleEvent) => {
          this.setState({ singleEvent });
        }).catch(err => console.error(err));
    }

    componentDidMount() {
      this.getsingleEvent();
    }

    render() {
      const singleEvent = { ...this.state.singleEvent };
      return (
        <div>
            <h4>Event Name:{singleEvent.eventName}</h4>
            <p>Location: {singleEvent.location}</p>
            <p>Description: {singleEvent.description}</p>
            <p>Start Date: {singleEvent.startDate}</p>
            <button className="bttn-pill bttn-info">Add Tasks</button>
        </div>
      );
    }
}

export default MyEvent;
