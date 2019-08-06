import React from 'react';
import authRequests from '../../../helpers/data/authRequest';
import './Auth.scss';
import logo from '../../../images/logo.png';

class Auth extends React.Component {

  googleAuthenticateUser = () => {
    authRequests.googleAuth()
      .then()
      .catch((error) => {
        console.error('There was an error loggin in', error);
      });
  };

  render() {
    return (
      <div className="w-75 mx-auto Auth mt-5">
        <div className="title-container text-center">
          <img src={logo} alt="volunteerwing" width="350px" className="logo animated zoomIn"/>
          <h3 className="desc mt-3">It's simple and easy.</h3>
          <h3 className="desc mt-3">Plan your events and coordinate volunteers</h3>
        </div>
        <div className="bttn-container text-center mt-5">
            <button className="bttn-pill bttn-lg bttn-danger" onClick={this.googleAuthenticateUser}>
            <i className="fab fa-google"></i> Sign In w/Google
            </button>
        </div>
      </div>
    );
  }
}

export default Auth;
