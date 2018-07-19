import React from 'react';

import {
    NavItem,
    NavLink,
} from 'reactstrap';

// import HeaderLinkTitle from './HeaderLinkTitle';

import { isActive } from '../../utils/LinkUtils';

const HeaderLink = (props) => {
    const url = props.title.toLowerCase();
    if (props.title.split(" ").length > 1) {
      throw new Error("~ Custom Error ~ The title of a Header Link cannot contain spaces because it is used to generate a URL.");
    }
    return (
      <NavItem className={isActive(`/${url}`)}>
        <NavLink href={`/${url}`}>
          {props.title}
        </NavLink>
      </NavItem>
    );
  };

export default HeaderLink;