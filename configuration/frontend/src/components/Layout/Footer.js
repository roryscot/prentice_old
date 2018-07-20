import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <div className="center">
      <hr/>
            2018 Prentice, source on <SourceLink>Github</SourceLink>
    </div>
  );
};

export default Footer;
