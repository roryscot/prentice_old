import React from 'react';
import PropTypes from 'prop-types';

import bn from 'utils/bemnames';

import {
  Navbar,
  // NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

import {
  MdNotificationsActive,
  MdNotificationsNone,
  MdInsertChart,
  MdPersonPin,
  MdMessage,
  MdSettingsApplications,
  MdHelp,
  MdClearAll,
  MdExitToApp,
} from 'react-icons/lib/md';

import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import HeaderLink from 'custom/Header/HeaderLink';
import HeaderLinkTitle from 'custom/Header/HeaderLinkTitle';

import { connect } from 'react-redux';
import { auth } from 'redux/actions';

import {isActive} from '../../utils/LinkUtils';

import withBadge from 'hocs/withBadge';

import { notificationsData } from 'demos/header';

const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  static propTypes = {
    sideBarIsOpen: PropTypes.bool.isRequired,
    handleSidebarControlButton: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
    username: PropTypes.string,
    logOut: PropTypes.func.isRequired,
    history: PropTypes.object,
  }

  static defaultProps = {
    user: {
      email: "example@email.com",
      id: 0,
      username: "Guest",
    }
  }

  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  logout = (e) => {
    e.preventDefault();
    this.props.logOut();
  }

  render() {
    console.log(this.props)
    const { isNotificationConfirmed } = this.state;
    const { user, isAuthenticated } = this.props;

    const guestLinks = (
          <Nav className="mr-2">
            <HeaderLink title="Register" isActive={isActive}/>
            <HeaderLink title="Login" isActive={isActive}/>
          </Nav>
    );

    const authenticatedLinks = (
      <Nav className="mr-2">
        <HeaderLink title="Profile" isActive={isActive}/>
        <HeaderLink title="Dashboard" isActive={isActive}/>
        <HeaderLink title="Test" isActive={isActive}/>
        <NavItem className="d-inline-flex">
          <NavLink href="#" onClick={this.logout}>
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );

    const generalLinks = (
      <Nav className="mr-2">
        <HeaderLink title="About" isActive={isActive}/>
        <HeaderLink title="Contact" isActive={isActive}/>
      </Nav>
    );

    return (
      <Navbar light expand className={bem.b('bg-white')}>
          {
            this.props.sideBarIsOpen ?
              null :
              (
                <Nav navbar className="mr-2">
                  <Button outline onClick={this.props.handleSidebarControlButton}>
                    <MdClearAll size={15} />
                  </Button>
                </Nav>
              )
          }
          {generalLinks}
          {
            isAuthenticated ?
              authenticatedLinks :
              guestLinks
          }
          { isAuthenticated ?
              <Nav navbar className={bem.e('nav-right')}>
              <NavItem className="d-inline-flex">
                <NavLink id="Popover1" className="position-relative">
                  {isNotificationConfirmed ? (
                    <MdNotificationsNone
                      size={25}
                      className="text-secondary can-click"
                      onClick={this.toggleNotificationPopover}
                    />
                  ) : (
                    <MdNotificationsActiveWithBadge
                      size={25}
                      className="text-secondary can-click animated swing"
                      onClick={this.toggleNotificationPopover}
                    />
                  )}
                </NavLink>
                <Popover
                  placement="bottom"
                  isOpen={this.state.isOpenNotificationPopover}
                  toggle={this.toggleNotificationPopover}
                  target="Popover1">
                  <PopoverBody>
                    <Notifications notificationsData={user.notificationsData} />
                  </PopoverBody>
                </Popover>
              </NavItem>
              
              <NavItem>
                <NavLink id="Popover2">
                  <Avatar
                    onClick={this.toggleUserCardPopover}
                    className="can-click"
                  />
                </NavLink>
                <Popover
                  placement="bottom-end"
                  isOpen={this.state.isOpenUserCardPopover}
                  toggle={this.toggleUserCardPopover}
                  target="Popover2"
                  className="p-0 border-0"
                  style={{ minWidth: 250 }}>
                  <PopoverBody className="p-0 border-light">
                    <UserCard
                      title={user.username}
                      subtitle={user.email}
                      text={"Helpful text goes here"}
                      className="border-light">
                      <ListGroup flush>
                        <NavLink to={'/profile'} tag="button" action className="border-light">
                          <MdPersonPin /> Profile
                        </NavLink>
                        <NavLink to={'/stats'} tag="button" action className="border-light">
                          <MdInsertChart /> Stats
                        </NavLink>
                        <ListGroupItem tag="button" action className="border-light">
                          <MdMessage /> Messages
                        </ListGroupItem>
                        <ListGroupItem tag="button" action className="border-light">
                          <MdSettingsApplications /> Settings
                        </ListGroupItem>
                        <ListGroupItem tag="button" action className="border-light">
                          <MdHelp /> Help
                        </ListGroupItem>
                        <ListGroupItem tag="button" action className="border-light">
                          <MdExitToApp /> Signout
                        </ListGroupItem>
                      </ListGroup>
                    </UserCard>
                  </PopoverBody>
                </Popover>
              </NavItem>
            </Nav> :

            <Nav navbar className={bem.e('nav-right')}>
              <NavItem className="d-inline-flex">
                <NavLink id="Popover1" className="position-relative">
                  {isNotificationConfirmed ? (
                    <MdNotificationsNone
                      size={25}
                      className="text-secondary can-click"
                      onClick={this.toggleNotificationPopover}
                    />
                  ) : (
                    <MdNotificationsActiveWithBadge
                      size={25}
                      className="text-secondary can-click animated swing"
                      onClick={this.toggleNotificationPopover}
                    />
                  )}
                </NavLink>
                <Popover
                  placement="bottom"
                  isOpen={this.state.isOpenNotificationPopover}
                  toggle={this.toggleNotificationPopover}
                  target="Popover1">
                  <PopoverBody>
                    <Notifications notificationsData={notificationsData} />
                  </PopoverBody>
                </Popover>
              </NavItem>
              
              <NavItem>
                <NavLink id="Popover2">
                  <Avatar
                    onClick={this.toggleUserCardPopover}
                    className="can-click"
                  />
                </NavLink>
                <Popover
                  placement="bottom-end"
                  isOpen={this.state.isOpenUserCardPopover}
                  toggle={this.toggleUserCardPopover}
                  target="Popover2"
                  className="p-0 border-0"
                  style={{ minWidth: 250 }}>
                  <PopoverBody className="p-0 border-light">
                    <UserCard
                      title="Jane"
                      subtitle="jane@jane.com"
                      text="Last updated 3 mins ago"
                      className="border-light">
                      <ListGroup flush>
                        <ListGroupItem tag="button" action className="border-light">
                          <MdPersonPin /> Profile
                        </ListGroupItem>
                        <ListGroupItem tag="button" action className="border-light">
                          <MdInsertChart /> Stats
                        </ListGroupItem>
                        <ListGroupItem tag="button" action className="border-light">
                          <MdMessage /> Messages
                        </ListGroupItem>
                        <ListGroupItem tag="button" action className="border-light">
                          <MdSettingsApplications /> Settings
                        </ListGroupItem>
                        <ListGroupItem tag="button" action className="border-light">
                          <MdHelp /> Help
                        </ListGroupItem>
                        <ListGroupItem tag="button" action className="border-light">
                          <MdExitToApp /> Signout
                        </ListGroupItem>
                      </ListGroup>
                    </UserCard>
                  </PopoverBody>
                </Popover>
              </NavItem>
            </Nav>
        }
      </Navbar>
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

