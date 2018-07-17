import Contact from './Contact';
import PrivacyPolicy from './PrivacyPolicy';

import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class Footer extends Component {

  constructor(props) {
    super(props);

    this.contacttoggle = this.contacttoggle.bind(this);
    this.policytoggle = this.policytoggle.bind(this);

    this.state = {
      contactModal: false,
      policyModal: false
    };
  }

  contacttoggle() {
    this.setState({
      contactModal: !this.state.contactModal
    });
  }

  policytoggle() {
    this.setState({
      policyModal: !this.state.policyModal
    });
  }

  render() {
    return (
      <div id="footer">
        <Nav className="nav justify-content-center footer-nav">
          <NavItem>
            <NavLink href="/privacy" onClick={this.policytoggle} >
              Privacy Policy
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact" onClick={this.contacttoggle}>Contact</NavLink>
          </NavItem>
        </Nav>
        <div className="copyright"> © 2018 App_rentice. All rights reserved.
        </div>
      </div>
    );
  }
}
