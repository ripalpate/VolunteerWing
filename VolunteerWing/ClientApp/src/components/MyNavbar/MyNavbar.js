import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
    currentUser: PropTypes.object,
  }

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent, currentUser } = this.props;
    const isUser = Object.keys(currentUser).length === 0 && currentUser.constructor === Object;
    
    const buildNavbar = () => {
      if (isAuthed && !isUser) {
        return (
        <Nav className="ml-auto" navbar>
          <NavItem className="nav-item nav">
            <NavLink tag={RRNavLink} to="/home">Home</NavLink>
          </NavItem>
          <NavItem className="nav-item nav">
            <NavLink tag={RRNavLink} to="/addEditEvent">Create Event</NavLink>
          </NavItem>
          <NavItem className="nav-item nav">
            <NavLink onClick={logoutClickEvent}>Logout</NavLink>
          </NavItem>
        </Nav>
        );
      }
      if (isAuthed && isUser) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem className="nav-item nav">
              <NavLink onClick={logoutClickEvent}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      if (!isAuthed) {
        return (
          <Nav className="ml-auto" navbar></Nav>
        );
      }
    };

    return (
      <div className="my-navbar mb-5">
       <Navbar color="dark" expand="md" className="fixed-top">
          <NavbarBrand href="/" className="nav">Volunteer Wing</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
           {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;