
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { auth } from '../../redux/actions';

import {isActive} from '../../utils/LinkUtils';

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import HeaderLink from './HeaderLink';
import HeaderLinkTitle from './HeaderLinkTitle';


class Header extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
      user: PropTypes.object
    }),
    username: PropTypes.string,
    logOut: PropTypes.func.isRequired,
    history: PropTypes.object,
  }

  state = {
    isOpen: false,
    demoModal: false,
    contactModal: false,
    policyModal: false
  }

  menutoggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  contacttoggle = () => {
    this.setState({
      contactModal: !this.state.contactModal
    });
  }

  policytoggle = () => {
    this.setState({
      policyModal: !this.state.policyModal
    });
  }

  logout = (e) => {
    console.log(this.props);
    e.preventDefault();
    this.props.logOut();
  }

  render() {
    const guestLinks = (
          <Nav className="ml-auto" navbar>
            <HeaderLink title="Register" isActive={isActive}/>
            <HeaderLink title="Login" isActive={isActive}/>
          </Nav>
    );

    const authenticatedLinks = (
      <Nav className="ml-auto" navbar>
        <HeaderLink title="Profile" isActive={isActive}/>
        <HeaderLink title="Dashboard" isActive={isActive}/>
        <HeaderLink title="Test" isActive={isActive}/>
        <NavItem >
          <NavLink href="#" onClick={this.logout}>
            <HeaderLinkTitle title="Logout" />
          </NavLink>
        </NavItem>
      </Nav>
    );

    const generalLinks = (
      <Nav className="ml-auto" navbar>
        <HeaderLink title="About" isActive={isActive}/>
        <HeaderLink title="Contact" isActive={isActive}/>
      </Nav>
    );

    return (
      <div className="header-container">
        <header className="clearfix" id="header">
            <Navbar className="links" >
              <Nav>
                <NavItem className={isActive('/')}>
                  <NavLink href={'/'} >
                    <HeaderLinkTitle title="App~rentice" />
                  </NavLink>
                </NavItem>
              </Nav>
              {generalLinks}
              {
                this.props.isAuthenticated ?
                  authenticatedLinks :
                  guestLinks
              }
            </Navbar>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(auth.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)((Header));
