import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
 Glyphicon, Nav, Navbar, NavItem 
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  NavLink,
} from 'reactstrap';
import './NavMenu.css';

export default class NavMenu extends Component {
   displayName = NavMenu.name

  // render() {
  //   return (
  //     <Navbar inverse fixedTop fluid collapseOnSelect>
  //       <Navbar.Header>
  //         <Navbar.Brand>
  //           <Link to={'/'}>VolunteerWing</Link>
  //         </Navbar.Brand>
  //         <Navbar.Toggle />
  //       </Navbar.Header>
  //       <Navbar.Collapse>
  //         <Nav>
  //           <LinkContainer to={'/'} exact>
  //             <NavItem>
  //               <Glyphicon glyph='home' /> Home
  //             </NavItem>
  //           </LinkContainer>
  //           <LinkContainer to={'/counter'}>
  //             <NavItem>
  //               <Glyphicon glyph='education' /> Counter
  //             </NavItem>
  //           </LinkContainer>
  //           <LinkContainer to={'/fetchdata'}>
  //             <NavItem>
  //               <Glyphicon glyph='th-list' /> Fetch data
  //             </NavItem>
  //           </LinkContainer>
  //         </Nav>
  //       </Navbar.Collapse>
  //     </Navbar>
  //   );
  // }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const buildNavbar = () => (
        <Nav className="ml-auto" navbar>
          <NavItem className="nav-item">
            <NavLink tag={RRNavLink} to="/home">Home</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={RRNavLink} to="/volunteerEvent">Create Volunteer Event</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink onClick={logoutClickEvent}>Logout</NavLink>
          </NavItem>
        </Nav>
      );

    return (
      <div className="my-navbar mb-5">
       <Navbar color="dark" dark expand="md" className="fixed-top">
          <NavbarBrand href="/">Volunteer Wing</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
           {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
      // <nav class="navbar navbar-expand-lg navbar-light bg-light">
      //   <a class="navbar-brand" href="#">Navbar</a>
      //   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      //     <span class="navbar-toggler-icon"></span>
      //   </button>

    //   <div class="collapse navbar-collapse" id="navbarSupportedContent">
    //     <ul class="navbar-nav ml-auto">
    //       <li class="nav-item active">
    //         <a class="nav-link" href="/home">Home</a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link" href="#">Create Volunteer Event</a>
    //       </li>
    //       <li class="nav-item dropdown">
    //         <a class="nav-link" href="#" onClick={logoutClickEvent}>Logout</a>
    //       </li>
    //       </ul>
    //     </div>
    //   </nav>
    );
  }
}
