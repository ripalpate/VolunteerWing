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

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } {...rest} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }}/>));
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
  }

  getUser = () => {
    const uid = authRequests.getCurrentUid();
    userRequests.getSingleUser(uid)
      .then((currentUser) => {
        if (currentUser.data.isActive === true) { this.setState({ currentUser: currentUser.data }); }
      });
  };

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
        authRequests.getCurrentUserJwt();
        this.getUser();
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
          currentUser: {},
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, pendingUser } = this.state;
    const currentUser = { ...this.state.currentUser };
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false, currentUser: {} });
    };

    if (pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
          <MyNavbar authed={ authed } currentUser={currentUser} logoutClickEvent={logoutClickEvent}/>
          <Switch>
            <PublicRoute path='/auth' component={Auth} authed={ authed }/>
            <PrivateRoute exact path='/' component={Home} authed={authed} />
            <PrivateRoute path='/home' exact component={Home} authed={authed} />
          </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
