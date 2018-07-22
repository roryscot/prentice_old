import { Content, Footer, Header, Sidebar } from 'components/Layout';
import React from 'react';
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty,
} from 'react-icons/lib/md';
import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';

class MainLayout extends React.Component {
  static isSidebarOpen = () => {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }
  state = {
    sideBarIsOpen: true
  }

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }
  // close sidebar when
  handleContentClick = event => {
    // close sidebar if sidebar is open and screen size is less than `md`
    if (
      MainLayout.isSidebarOpen() &&
      (this.props.breakpoint === 'xs' ||
        this.props.breakpoint === 'sm' ||
        this.props.breakpoint === 'md')
    ) {
      this.openSidebar('close');
    }
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  }

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
    this.setState({
      sideBarIsOpen: !this.state.sideBarIsOpen
    });
  };

  openSidebar = (openOrClose) => {
    if (openOrClose === 'open') {
      return document
        .querySelector('.cr-sidebar')
        .classList.add('cr-sidebar--open');
    }
    document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
  }

  render() {
    const { children } = this.props;
    return (
      <main className="cr-app bg-light">
        <Sidebar handleSidebarControlButton={this.handleSidebarControlButton}/>
        <Content fluid onClick={this.handleContentClick}>
          <Header
            sideBarIsOpen={this.state.sideBarIsOpen}
            handleSidebarControlButton={this.handleSidebarControlButton}
          />
          {children}
          <Footer />
        </Content>
      </main>
    );
  }
}

export default MainLayout;
