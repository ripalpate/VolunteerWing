import React from 'react';
import PropTypes from 'prop-types';
// import ProfileModal from '../../ProfileModal/ProfileModal';
import userRequests from '../../../helpers/data/userRequests';
import './Profile.scss';

class Profile extends React.Component {
  state = {
    isEditing: false,
    profileModal: false,
    editedUser: {},
  }

  static propTypes = {
    currentUser: PropTypes.object,
    getUser: PropTypes.func,
  }

  editProfile = (e) => {
    this.setState({ isEditing: true });
  }

  cancel = () => {
    this.setState({ isEditing: false });
  }

  formFieldStringState = (name, e) => {
    const tempUser = { ...this.state.editedUser };
    tempUser[name] = e.target.value;
    this.setState({ editedUser: tempUser });
  }

  formFieldNumberState = (name, e) => {
    const tempUser = { ...this.state.editedUser };
    tempUser[name] = e.target.value;
    this.setState({ editedUser: tempUser });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { editedUser } = this.state;
    const { currentUser } = this.props;
    const userId = currentUser.id;
    userRequests.updateUser(userId, editedUser)
      .then(() => {
        this.setState({ isEditing: false }, this.props.getUser);
      });
  }

  emailChange = e => this.formFieldStringState('email', e);

  nameChange = e => this.formFieldStringState('name', e);

  streetChange = e => this.formFieldStringState('street', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  zipCodeChange = e => this.formFieldStringState('zipCode', e);

  phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

  ageChange = e => this.formFieldNumberState('age', e);

  componentDidMount() {
    const { currentUser } = this.props;
    this.setState({ editedUser: currentUser });
  }

  render() {
    const { currentUser } = this.props;
    const { isEditing, editedUser } = this.state;
    const makeEditProfileCard = () => {
      if (isEditing) {
        return (
              <form className="row edit-form-container w-50 mx-auto border border-dark rounded animated zoomIn" onSubmit={this.formSubmit}>
                <h3 className="mx-auto edit-profile-title">Edit Profile</h3>
                <div className="form col-11 mt-2">
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only profile-form-label">Email</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Email</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="bob@xxx.com"
                        value={editedUser.email}
                        onChange={this.emailChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="name" className="sr-only profile-form-label">Name</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Name</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Sumatra Wet Process Gunung Tujuh"
                        value={editedUser.name}
                        onChange={this.nameChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="age" className="sr-only profile-form-label">Age</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Age</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="age"
                        placeholder= "30"
                        value={editedUser.age}
                        onChange={this.ageChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only profile-form-label">Street</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Street</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="street"
                        placeholder="123 Main St."
                        value={editedUser.street}
                        onChange={this.streetChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only profile-form-label">City</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">City</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Springfield"
                        value={editedUser.city}
                        onChange={this.cityChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only profile-form-label">State</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">State</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="TN"
                        value={editedUser.state}
                        onChange={this.stateChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only profile-form-label">Zip Code</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Zip Code</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        placeholder="12345-6789"
                        pattern="[0-9]{5}(?:-[0-9]{4})?"
                        value={editedUser.zipCode}
                        onChange={this.zipCodeChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="col-auto form-lines p-0">
                    <label htmlFor="link" className="sr-only profile-form-label">Phone Number</label>
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Phone Number</div>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        placeholder="615-333-4444"
                        pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
                        value={editedUser.phoneNumber}
                        onChange={this.phoneNumberChange}
                        required
                        />
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="bttn-pill user-add-btn m-2" title="Submit">
                      <i className="user-add-btn far fa-check-square fa-1x"/>
                    </button>
                    <button id='cancel' type="button" className="bttn-pill back-btn m-2" onClick={this.cancel} title="Cancel">
                      <i className="back-btn far fa-window-close fa-1x"/>
                    </button>
                  </div>
                </div>
              </form>
        );
      } return (
        <div className="profile-card border border-dark rounded animated zoomIn mx-auto p-3">
        <h3 className="text-center profile-header">{currentUser.name}</h3>
        <div className="ml-1">Email: {currentUser.email}</div>
        <div className="ml-1">Age: {currentUser.age}</div>
        <div className="ml-1">Street: {currentUser.street}</div>
        <div className="ml-1">City: {currentUser.city}</div>
        <div className="ml-1">State: {currentUser.state}</div>
        <div className="ml-1">Zipcode: {currentUser.zipCode}</div>
        <div className="ml-1">Phone Number: {currentUser.phoneNumber}</div>
        <div className="text-center">
          <button className="bttn-pill bttn-warning" onClick={this.editProfile}><i className="far fa-edit fa-1x"/></button>
          <button className="bttn-pill bttn-danger ml-2"><i className="fas fa-trash fa-1x"></i></button>
        </div>
        </div>
      );
    };

    return (
      <div className="">
        {makeEditProfileCard()}
      </div>
    );
  }
}

export default Profile;
