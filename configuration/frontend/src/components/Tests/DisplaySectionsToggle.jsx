import React from 'react';
import Expand from '../../assets/icons/expand1.png';
import Collapse from '../../assets/icons/collapse.png';

export const DisplayAllSectionsToggler = (props) => (
    <span className="close" onClick={props.toggle}>
    {
        props.allTestSectionsDisplayed ?
        <img src={Collapse} alt="Collapse"/> :
        <img src={Expand} alt="Expand"/>
    }
    </span>
);


export const DisplayTestToggler = (props) => (
    <span className="close" onClick={props.toggle}>
        {
            props.collapse ?
            <img src={Collapse} alt="Collapse"/> :
            <img src={Expand} alt="Expand"/>
        }
    </span>
);


export const DisplaySectionToggler = (props) => (
    <span className="close" onClick={props.toggle}>
        {
            props.collapse ?
            <img src={Collapse} alt="Collapse"/> :
            <img src={Expand} alt="Expand"/>
        }
    </span>
);
