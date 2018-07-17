import React from 'react';
import PropTypes from 'prop-types';

import AssignmentDisplay from './AssignmentDisplay';

const AssignmentWeekDisplay = (props) => {
    const {title, assignments, id, updateAssignment} = props;

    return (
        <div className="fields">
            <h4 className="major">{title}</h4>
            {
                assignments ? assignments.map((assignment)=>(
                    <div key={assignment.id} className="field third">
                        <AssignmentDisplay
                            id={assignment.id}
                            assignment={assignment}
                            dueDate={assignment.dueDate}
                            updateAssignment={updateAssignment}
                            AssignmentWeekID={id}
                        />
                    </div>
                )) :
                <div>No Assignments to Display</div>
            }
            <hr/>
        </div>
    );
};


AssignmentWeekDisplay.propTypes = {
    title: PropTypes.string.isRequired,
    assignments: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    updateAssignment: PropTypes.func.isRequired,
};

export default AssignmentWeekDisplay;