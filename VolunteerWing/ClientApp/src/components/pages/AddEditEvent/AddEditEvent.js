import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import volunteerEventRequests from '../../../helpers/data/volunteerEventRequests';
import './AddEditEvent.scss';

const defaultEvent = {
  eventName: '',
  location: '',
  description: '',
  adminId: 0,
};

class AddEditEvent extends React.Component {
  state = {
    newEvent: defaultEvent,
    startDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
  }

  static propTypes = {
    currentUser: PropTypes.object,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempEvent = { ...this.state.newEvent };
    tempEvent[name] = e.target.value;
    this.setState({ newEvent: tempEvent });
  }

  eventNameChange = e => this.formFieldStringState('eventName', e);

  locationChange = e => this.formFieldStringState('location', e);

  descriptionChange = e => this.formFieldStringState('description', e);

  handleStartDateChange = (date) => {
    const newDate = new Date(date);
    this.setState({ startDate: newDate, startTime: newDate, endTime: newDate });
  }

 handleStartTimeChange = (time) => {
   this.setState({ startTime: time });
 }

 handleEndTimeChange = (time) => {
   this.setState({ endTime: time });
 }

 createEvent = (myEvent) => {
   volunteerEventRequests.createEvent(myEvent)
     .then((event) => {
       this.setState({
         newEvent: defaultEvent,
         startDate: new Date(),
         startTime: new Date(),
         endTime: new Date(),
       });
       this.props.history.push(`/myEvent/${event.data.id}`);
     });
 }

 formSubmit = (e) => {
   const currentUser = { ...this.props.currentUser };
   e.preventDefault();
   const myEvent = { ...this.state.newEvent };
   myEvent.startDate = this.state.startDate;
   myEvent.startTime = this.state.startTime;
   myEvent.endTime = this.state.endTime;
   myEvent.adminId = currentUser.id;
   this.createEvent(myEvent);
 }

 render() {
   const { newEvent } = this.state;
   return (
     <div className="form-wrapper">
        <form onSubmit={this.formSubmit} className= "w-50 mx-auto border border-dark rounded p-4">
        <div className="form-group row">
          <label htmlFor="eventName" className="col-sm-2 col-form-label">Event Name:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="eventName"
              placeholder="Event Name"
              value= {newEvent.eventName}
              onChange= {this.eventNameChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Location</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Charlie Daniels Park"
              value= {newEvent.location}
              onChange= {this.locationChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <textarea
              type="text"
              className="form-control"
              id="location"
              placeholder="Event description"
              value= {newEvent.description}
              onChange= {this.descriptionChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Start Date</label>
          <div className="col-sm-10">
            <DatePicker
              selectsStart
              selected={this.state.startDate}
              onChange={this.handleStartDateChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Start Time</label>
          <div className="col-sm-10">
            <DatePicker
              selected={this.state.startTime}
              onChange={this.handleStartTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              timeCaption="Time"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">End Time</label>
          <div className="col-sm-10">
            <DatePicker
              selected={this.state.endTime}
              onChange={this.handleEndTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              timeCaption="Time"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Save Event</button>
          </div>
        </div>
      </form>
    </div>
   );
 }
}

export default AddEditEvent;
