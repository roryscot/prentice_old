import React from 'react';
import PropTypes from 'prop-types';

import CardDisplay from './CardDisplay';

const CardGroupDisplay = (props) => {
    const {title, cards} = props;

    return (
        <div className="fields">
            <h5>{title}</h5>
            {
                cards ? cards.map((card)=>(
                    <div key={card.id} className="field third">
                        <CardDisplay
                            id={card.id}
                            card={card}
                            dueDate={card.dueDate}
                        />
                    </div>

                )) :
                <div>No Assignments to Display</div>
            }
        </div>
    );
};


CardGroupDisplay.propTypes = {
    "title": PropTypes.string.isRequired,
    "cards": PropTypes.array.isRequired
};

export default CardGroupDisplay;