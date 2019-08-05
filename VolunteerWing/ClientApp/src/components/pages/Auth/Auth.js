import React from 'react';
import authRequests from '../../../helpers/data/authRequest';
import './Auth.scss';


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
      <div className="Auth mt-5">
        <div className="title-container">
          <h3 className="title text-center heading-EaseOffBills ">Welcome</h3>
          <h3 className="title text-center heading-EaseOffBills">To</h3>
          <h3 className=" title text-center">Volunteer Wing</h3>
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
