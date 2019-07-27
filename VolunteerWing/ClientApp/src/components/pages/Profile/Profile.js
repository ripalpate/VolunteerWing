import React from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';

class Profile extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className="profile-card border border-dark rounded animated zoomIn mx-auto p-3">
        <h3 className="text-center profile-header">{currentUser.name}</h3>
        <div className="ml-1">Email: {currentUser.email}</div>
        <div className="ml-1">Street: {currentUser.street}</div>
        <div className="ml-1">City: {currentUser.city}</div>
        <div className="ml-1">State: {currentUser.state}</div>
        <div className="ml-1">Zipcode: {currentUser.zipCode}</div>
        <div className="ml-1">Phone Number: {currentUser.phoneNumber}</div>
        <div className="text-center">
          <button className="bttn-pill bttn-warning"><i className="far fa-edit fa-1x"/></button>
          <button className="bttn-pill bttn-danger ml-2"><i className="fas fa-trash fa-1x"></i></button>
        </div>
      </div>
    );
  }
}

export default Profile;
