import { ADD_ASSIGNMENT_SUCCESS, UPDATE_ASSIGNMENT_SUCCESS, DELETE_ASSIGNMENT_SUCCESS, FETCH_ASSIGNMENTS_SUCCESS } from '../actionTypes';

import initialState from '../initialState';


export default function handleAssignments(state=initialState.assignments, action) {
    let assignmentWeeksList = state.slice();

  switch (action.type) {

    case ADD_ASSIGNMENT_SUCCESS:
      return [...state, action.assignment];

    case UPDATE_ASSIGNMENT_SUCCESS:
      let assignmentToUpdate = assignmentWeeksList[action.index];
      assignmentToUpdate.text = action.assignment.text;
      assignmentWeeksList.splice(action.index, 1, assignmentToUpdate);
      return assignmentWeeksList;

    case DELETE_ASSIGNMENT_SUCCESS:
    assignmentWeeksList.splice(action.index, 1);
    return assignmentWeeksList;

    case FETCH_ASSIGNMENTS_SUCCESS:
      return [...state, ...action.assignments];

    default:
      return state;
  }
}