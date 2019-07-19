import React from 'react';
import './Home.scss';

class Home extends React.Component {

  changeView = (e) => {
    const view = e.currentTarget.id;
    this.props.history.push(`/${view}`);
  }

  render() {
    return (
      <div className="home mx-auto">
        <div className="card-columns homeWrapper mt-5">
          <div className="card mt-3 border-dark animated zoomIn" id="profile" onClick={this.changeView}>
            <div className="card-body home text-center">
              <h4 className="card-title"><i className="fas fa-user fa-6x"></i></h4>
              <h5 className="card-subtitle mb-2 text-muted">Profile</h5>
              <p className="card-text">View Profile</p>
            </div>
          </div>
          <div className="card mt-3 border-dark animated zoomIn" id="createEvent" onClick={this.changeView}>
            <div className="card-body home text-center">
              <h4 className="card-title"><i className="fas fa-plus-circle fa-6x"></i></h4>
              <h5 className="card-subtitle mb-2 text-muted">Create Event</h5>
              <p className="card-text">Add your event here to volunteer</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
