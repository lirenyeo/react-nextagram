import React from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap'

import AuthenticationModal from '../containers/AuthenticationModal'

export default class NavigationBar extends React.Component {
  state = {
    isOpen: false,
  }

  toggleCollapsedMenu = () => this.setState({isOpen: !this.state.isOpen})

  render() {
    return (
      <div id="nav">
        <Navbar color="transparent" light expand="md">
          <NavbarBrand tag={Link} to='/' href="/">
            <img height="35" width="47" src="https://cdn.dribbble.com/users/41636/screenshots/2719580/instagram-logo-concept.jpg" alt=""/>
            Reactagram
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleCollapsedMenu} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to='/'>Home</NavLink>
              </NavItem>
              {
                localStorage.jwt &&
                <NavItem>
                  <NavLink tag={Link} to='/profile'>My Profile</NavLink>
                </NavItem>
              }
              <NavItem>
                <NavLink tag={AuthenticationModal} />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}