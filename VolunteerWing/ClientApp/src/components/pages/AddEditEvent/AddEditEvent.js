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
  startDate: new Date(),
  startTime: new Date(),
  endTime: new Date(),
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
    const { newEvent } = this.state;
    const newDate = new Date(date);
    this.setState({ startDate: newDate, startTime: newDate, endTime: newDate });
    newEvent.startDate = newDate;
  }

 handleStartTimeChange = (time) => {
   const { newEvent } = this.state;
   this.setState({ startTime: time });
   newEvent.startTime = time;
 }

 handleEndTimeChange = (time) => {
   const { newEvent } = this.state;
   this.setState({ endTime: time });
   newEvent.endTime = time;
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
   const { isEditingEvent, changeIsEditingEventState } = this.props;
   const currentUser = { ...this.props.currentUser };
   e.preventDefault();
   const myEvent = { ...this.state.newEvent };
   myEvent.startDate = this.state.startDate;
   myEvent.startTime = this.state.startTime;
   myEvent.endTime = this.state.endTime;
   myEvent.adminId = currentUser.id;
   if (isEditingEvent === false) {
     this.createEvent(myEvent);
   } else if (isEditingEvent === true) {
     volunteerEventRequests.updateEvent(myEvent.id, myEvent)
       .then(() => {
         changeIsEditingEventState();
         this.props.history.push(`/myEvent/${myEvent.id}`);
       });
   }
 }

 componentDidMount() {
   const { isEditingEvent, editEventId } = this.props;
   if (isEditingEvent) {
     volunteerEventRequests.getSingleEvent(editEventId)
       .then((singleEvent) => {
         this.setState({
           newEvent: singleEvent,
           startDate: new Date(singleEvent.startDate),
           startTime: new Date(singleEvent.startTime),
           endTime: new Date(singleEvent.endTime),
         });
       })
       .catch(err => console.error(err));
   }
 }

 render() {
   const { newEvent } = this.state;
   return (
     <div className="form-wrapper">
        <form onSubmit={this.formSubmit} className= "form w-50 mx-auto border border-dark rounded p-4">
          <h4 className="header text-center pb-3">Let's Get Started</h4>
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
              minDate = {new Date()}
              className="form-control"
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
              timeIntervals={30}
              dateFormat="h:mm aa"
              timeCaption="Time"
              className="form-control"
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
              timeIntervals={30}
              dateFormat="h:mm aa"
              timeCaption="Time"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10 text-center">
            <button type="submit" className="bttn-pill add bttn-success"><i className="fas fa-plus-circle pr-2"></i>Save</button>
          </div>
        </div>
      </form>
    </div>
   );
 }
}

export default AddEditEvent;
