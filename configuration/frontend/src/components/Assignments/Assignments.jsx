import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {assignments} from "../../redux/actions";

import AssignmentWeekDisplay from './AssignmentWeekDisplay';

class Assignments extends Component {
    static propTypes = {
        assignmentWeeks: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                text: PropTypes.string
            })
        ),
        fetchAssignments: PropTypes.func.isRequired,
        deleteAssignment: PropTypes.func.isRequired,
        updateAssignment: PropTypes.func.isRequired,
        addAssignment: PropTypes.func.isRequired,
    }

    state = {
        newAssignmentWeekTitle: "Week of ",

        addNewListButtonDisplay: false,
    };

    componentDidMount() {
        this.props.fetchAssignments();
    }

    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
    };

    handleAddWeek = (e) =>  {
        e.preventDefault();
        // let headers = {"Content-Type": "application/json"};
        // let body = JSON.stringify({
        //         group_list_title: this.state.newGrouplistTitle
        //     });
        // if (this.state.newGrouplistTitle.length) {
        //     fetch("todo/grouplists/", {headers, body, method: "POST"})
        //         .then(res=>{
        //             if (res.status < 500) {
        //                 return res.json().then(data => {
        //                     console.log(data)
        //                     // return this.props.fetchAssignments()
        //                 });
        //             } else {
        //                 console.log("Server Error!");
        //                 throw res;
        //             }
        //         });
        // }
    }

    handleDisplayAddAssignmentWeek = () => {
        this.setState({addNewListButtonDisplay: !this.state.addNewListButtonDisplay });
    }

    render() {
        const { assignmentWeeks } = this.props;
        return(
            <div>
                <h3 className="text-center">Homework Assignments</h3>
                    <div className="">
                        <div className="">
                             {
                                assignmentWeeks ? assignmentWeeks.map((week, i)=>{
                                    const {id,assignment_week_title, assignments} = week;
                                    return (
                                        <div key={id+assignment_week_title}>
                                            <AssignmentWeekDisplay
                                                updateAssignment={this.props.updateAssignment}
                                                assignments={assignments}
                                                title={assignment_week_title}
                                                id ={id}
                                            />
                                            <br/>
                                        </div>
                                    );
                                }) :
                                <div>No Assignments ...yet</div>
                            }
                        </div>
                        <hr/>
                    </div>
                {
                    this.state.addNewListButtonDisplay ?

                    <form className="fields">
                        <h5>Create a new List:</h5>
                        {/* TODO: set default text and add calendar input */}
                        <input
                            className="field half"
                            onChange={this.onChange}
                            type="text"
                            placeholder="Assignment Week:"
                            name="newAssignmentWeekTitle"
                            value={this.state.newAssignmentWeekTitle}
                        />
                        <button onClick={this.handleCreateGroupList}>Submit</button>
                    </form>
                    :
                    <div>
                        <h4>Add A New Week</h4>
                        <button onClick={this.handleDisplayAddAssignmentWeek}>+</button>
                    </div>
                }
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        //named assignmentWeeks because assignments is reserved for the redux actions
        assignmentWeeks: state.assignments,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addAssignment: (text) => {
            return dispatch(assignments.addAssignment(text));
        },
        updateAssignment: (id, text) => {
          return dispatch(assignments.updateAssignment(id, text));
        },
        deleteAssignment: (id) => {
          dispatch(assignments.deleteAssignment(id));
        },
        fetchAssignments: () => {
            dispatch(assignments.fetchAssignments());
        },
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Assignments);