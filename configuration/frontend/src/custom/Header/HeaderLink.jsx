import React from 'react';

import {
    NavItem,
    NavLink,
} from 'reactstrap';

// import HeaderLinkTitle from './HeaderLinkTitle';

import { isActive } from '../../utils/LinkUtils';

const HeaderLink = ({title}) => {
    const url = title.toLowerCase();
    if (title.split(" ").length > 1) {
      throw new Error("~ Custom Error ~ The title of a Header Link cannot contain spaces because it is used to generate a URL.");
    }
    return (
      <NavItem className={isActive(`/${url}`)}>
        <NavLink href={`/${url}`}>
          {title}
        </NavLink>
      </NavItem>
    );
  };

export default HeaderLink;