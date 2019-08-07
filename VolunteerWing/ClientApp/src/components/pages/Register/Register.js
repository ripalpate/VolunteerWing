import React from 'react';
import PropTypes from 'prop-types';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequest';

import './Register.scss';

const defaultUser = {
  email: '',
  firebaseId: '',
  name: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  phoneNumber: '',
};

class Register extends React.Component {
  registerMounted = false;

  static propTypes = {
    getUser: PropTypes.func,
    isRegistered: PropTypes.bool,
  }

  state = {
    newUser: defaultUser,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempUser = { ...this.state.newUser };
    tempUser[name] = e.target.value;
    this.setState({ newUser: tempUser });
  }

  formFieldNumberState = (name, e) => {
    e.preventDefault();
    const tempUser = { ...this.state.newUser };
    tempUser[name] = e.target.value * 1;
    this.setState({ newUser: tempUser });
  }

  emailChange = e => this.formFieldStringState('email', e);

  nameChange = e => this.formFieldStringState('name', e);

  streetChange = e => this.formFieldStringState('street', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  zipCodeChange = e => this.formFieldStringState('zipCode', e);

  phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

  formSubmit = (e) => {
    const { getUser } = this.props;
    e.preventDefault();
    const myUser = { ...this.state.newUser };
    myUser.isActive = true;
    myUser.isAdmin = false;
    myUser.firebaseId = authRequests.getCurrentUid();
    this.setState({ newUser: defaultUser });
    userRequests.createUser(myUser)
      .then(() => {
        getUser();
      });
  };

  checkRegistration = () => {
    const { isRegistered } = this.props;
    if (isRegistered) {
      this.props.history.push('/home');
    }
  }

  getEmail = () => {
    const { newUser } = this.state;
    newUser.email = authRequests.getUserEmail();
    this.setState({ newUser });
  }

  componentDidMount() {
    this.checkRegistration();
    this.getEmail();
  }

  render() {
    const {
      newUser,
    } = this.state;

    return (
        <div className="reg-container d-flex">
            <form className="row form-container form border border-dark rounded mt-5 mx-auto" onSubmit={this.formSubmit}>
            <h3 className="reg-title mx-auto p-3">Your Information</h3>
            <div className="form col-11 mx-auto">
                <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                    <div className="input-group-text">Email</div>
                    </div>
                    <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="bob@xxx.com"
                    value={newUser.email}
                    onChange={this.emailChange}
                    required
                    />
                </div>
                </div>
                <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                    <div className="input-group-text">Name</div>
                    </div>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="First Last"
                    value={newUser.name}
                    onChange={this.nameChange}
                    required
                    />
                </div>
                </div>
                <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                    <div className="input-group-text">Street</div>
                    </div>
                    <input
                    type="text"
                    className="form-control"
                    id="street"
                    placeholder="123 Main St."
                    value={newUser.street}
                    onChange={this.streetChange}
                    required
                    />
                </div>
                </div>
                <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                    <div className="input-group-text">City</div>
                    </div>
                    <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="Springfield"
                    value={newUser.city}
                    onChange={this.cityChange}
                    required
                    />
                </div>
                </div>
                <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                    <div className="input-group-text">State</div>
                    </div>
                    <input
                    type="text"
                    className="form-control"
                    id="state"
                    placeholder="TN"
                    value={newUser.state}
                    onChange={this.stateChange}
                    required
                    />
                </div>
                </div>
                <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                    <div className="input-group-text">Zip Code</div>
                    </div>
                    <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    placeholder="12345-6789"
                    pattern="^[0-9]{5}(?:-[0-9]{4})?$"
                    value={newUser.zipCode}
                    onChange={this.zipCodeChange}
                    required
                    />
                </div>
                </div>
                <div className="col-auto form-lines p-0">
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                    <div className="input-group-text">Phone Number</div>
                    </div>
                    <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="615-333-4444"
                    value={newUser.phoneNumber}
                    onChange={this.phoneNumberChange}
                    pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
                    required
                    />
                </div>
                </div>
                <div className="text-center">
                <button className="bttn-jelly bttn-success add-btn mb-3 mt-3" title="Submit">
                    <i className="fas fa-plus-circle pr-2"></i>Let's roll
                </button>
                </div>
            </div>
            </form>
        </div>
    );
  }
}

export default Register;