import { ADD_ASSIGNMENT, UPDATE_ASSIGNMENT, DELETE_ASSIGNMENT, FETCH_ASSIGNMENTS } from '../actionTypes';

import initialState from './initialState';


export default function handleAssignments(state=initialState.assignments, action) {
    let assignmentWeeksList = state.slice();

  switch (action.type) {

    case ADD_ASSIGNMENT:
      return [...state, action.assignment];

    case UPDATE_ASSIGNMENT:
      let assignmentToUpdate = assignmentWeeksList[action.index];
      assignmentToUpdate.text = action.assignment.text;
      assignmentWeeksList.splice(action.index, 1, assignmentToUpdate);
      return assignmentWeeksList;

    case DELETE_ASSIGNMENT:
    assignmentWeeksList.splice(action.index, 1);
    return assignmentWeeksList;

    case FETCH_ASSIGNMENTS:
      return [...state, ...action.assignments];

    default:
      return state;
  }
}