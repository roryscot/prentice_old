import React from 'react';
import PropTypes from 'prop-types';
import CardGroupDisplay from './CardGroupDisplay';

const GroupListDisplay = (props) => {
    return (
        <div id="work" className="assignments-list">
                {
                    props.groups ? props.groups.map((cardgroup, i)=>{
                        return (
                            <div key={cardgroup.card_group_title}>
                                <CardGroupDisplay
                                    cards={cardgroup.cards}
                                    title={cardgroup.card_group_title}
                                    id ={i}
                                />
                                <br/>
                            </div>
                        );
                    }) :
                    <div>No Card Groups</div>
                }
        </div>
    );
};

GroupListDisplay.propTypes = {
    groups: PropTypes.array
};

export default GroupListDisplay;