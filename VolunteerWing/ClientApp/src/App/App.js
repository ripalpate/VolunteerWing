import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import connection from '../helpers/data/connection';
import authRequests from '../helpers/data/authRequest';
import userRequests from '../helpers/data/userRequests';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Register from '../components/pages/Register/Register';
import Profile from '../components/pages/Profile/Profile';
import AddEditEvent from '../components/pages/AddEditEvent/AddEditEvent';
import CreatedEvents from '../components/pages/CreatedEvents/CreatedEvents';
import MyEvent from '../components/pages/MyEvent/MyEvent';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } {...rest} />)
    : (<Redirect to={{ pathname: '/register', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};


class App extends React.Component {
  state= {
    authed: false,
    pendingUser: true,
    currentUser: {},
    isRegistered: false,
  }

  getUser = () => {
    const uid = authRequests.getCurrentUid();
    userRequests.getSingleUser(uid)
      .then((currentUser) => {
        if (currentUser.data.isActive === true) { this.setState({ currentUser: currentUser.data, isRegistered: true }); }
      });
  };

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        }, this.getUser());
        authRequests.getCurrentUserJwt();
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
          currentUser: {},
          isRegistered: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, pendingUser, isRegistered } = this.state;
    const currentUser = { ...this.state.currentUser };
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false, currentUser: {}, isRegistered: false });
    };

    if (pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
          <MyNavbar isAuthed={ authed } currentUser={currentUser} logoutClickEvent={logoutClickEvent}/>
          <Switch>
            <PublicRoute path='/auth' component={Auth} authed={ authed }/>
            <PrivateRoute exact path='/' component={props => <Home {...props} currentUser={currentUser}/>} authed={authed} />
            <PrivateRoute path='/register' exact component={props => <Register getUser={this.getUser} isRegistered={isRegistered} {...props} currentUser={currentUser}/>} authed={authed}/>
            <PrivateRoute path='/home' exact component={props => <Home {...props} currentUser={currentUser}/>} authed={authed} />
            <PrivateRoute path='/profile' component={props => <Profile {...props} currentUser={currentUser} getUser={this.getUser}/>} authed={authed} />
            <PrivateRoute path='/addEditEvent' component={props => <AddEditEvent {...props} currentUser={currentUser}/>} authed={authed} />
            <PrivateRoute exact path='/createdEvent/:id' component={props => <CreatedEvents {...props} currentUser={currentUser}/>} authed={authed} />
            <PrivateRoute exact path='/myEvent/:id' component={props => <MyEvent {...props} currentUser={currentUser}/>} authed={authed}/>
          </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
