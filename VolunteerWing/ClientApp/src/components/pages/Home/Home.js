import React from 'react';
import PropTypes from 'prop-types';
import CreatedEventsModal from '../../CreatedEventsModal/CreatedEventsModal';
import SignupModal from '../../SignupModal/SignupModal';
import './Home.scss';

class Home extends React.Component {
  state = {
    createdEventsModal: false,
    viewSignupModal: false,
    // editEventId: 0,
    // isEditingEvent: false,
  }

  static = {
    currentUser: PropTypes.object,
  }

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  toggleCreatedEventsModal = () => {
    const { createdEventsModal } = this.state;
    this.setState({ createdEventsModal: !createdEventsModal });
  }

  toggleViewSignupModal = () => {
    const { viewSignupModal } = this.state;
    this.setState({ viewSignupModal: !viewSignupModal });
  }

  eventDetailView = (eventId) => {
    this.props.history.push(`/createdEvent/${eventId}`);
  }

  routeToAddEditEvent = () => {
    this.props.history.push('/addEditEvent');
  }

  render() {
    const { currentUser, passEventToEdit } = this.props;
    const { createdEventsModal, viewSignupModal } = this.state;
    const adminCards = () => {
      if (currentUser.isAdmin) {
        return (
        <div className="d-flex flex-wrap justify-content-center">
          <div className="card mt-3 border-dark animated zoomIn" id="createdEvents" onClick={this.toggleCreatedEventsModal}>
            <div className="card-body home text-center">
              <h4 className="card-title"><i className="fas fa-calendar-alt fa-6x"></i></h4>
              <h5 className="card-subtitle mb-2 text-muted">View created Events</h5>
              <p className="card-text">View the events that I have created </p>
            </div>
          </div>
        </div>
        );
      }
    };
    return (
      <div className="home w-75 mx-auto pt-4">
        <div className="homeWrapper mt-5 d-flex flex-wrap justify-content-center">
            <div className="card mt-3 border-dark animated zoomIn" id="profile" onClick={this.changeView}>
              <div className="card-body home text-center">
                <h4 className="card-title"><i className="fas fa-user fa-6x"></i></h4>
                <h5 className="card-subtitle mb-2 text-muted">Profile</h5>
                <p className="card-text">View Profile</p>
              </div>
            </div>
            <div className="card mt-3 border-dark animated zoomIn" id="addEditEvent" onClick={this.changeView}>
              <div className="card-body home text-center">
                <h4 className="card-title"><i className="fas fa-plus-circle fa-6x"></i></h4>
                <h5 className="card-subtitle mb-2 text-muted">Create Event</h5>
                <p className="card-text">Add your event here to volunteer</p>
              </div>
            </div>
            <div className="card mt-3 border-dark animated zoomIn" id="viewSignups" onClick={this.toggleViewSignupModal}>
              <div className="card-body home text-center">
                <h4 className="card-title"><i className="fas fa-hands-helping fa-6x"></i></h4>
                <h5 className="card-subtitle mb-2 text-muted">View signups</h5>
                <p className="card-text">View the events that you have sign up </p>
              </div>
            </div>
            {adminCards()}
        </div>
        <CreatedEventsModal
        createdEventsModal = {createdEventsModal}
        toggleCreatedEventsModal = {this.toggleCreatedEventsModal}
        currentUser = {currentUser}
        eventDetailView = {this.eventDetailView}
        routeToAddEditEvent = {this.routeToAddEditEvent}
        passEventToEdit = {passEventToEdit}
        />
        <SignupModal
        viewSignupModal = {viewSignupModal}
        toggleViewSignupModal = {this.toggleViewSignupModal}
        currentUser = {currentUser}
        eventDetailView = {this.eventDetailView}
        />
      </div>
    );
  }
}

export default Home;
