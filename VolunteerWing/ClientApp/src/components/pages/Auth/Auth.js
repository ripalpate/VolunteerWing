import React from 'react';
import { Button } from 'reactstrap';
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
        <h3>Welcome To Volunteer Wing</h3>
        <div className="btn-container">
            <Button color="info" className="bttn-pill bttn-lg bttn-danger" onClick={this.googleAuthenticateUser}>
            {/* <i className="fab fa-google"></i> Sign In w/Google */}
            Sign In
            </Button>
        </div>
      </div>
    );
  }
}

export default Auth;
