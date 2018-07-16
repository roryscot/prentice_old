import actions from '../constants';

const initialState = [];


export default function handleAssignments(state=initialState, action) {
    let assignmentWeeksList = state.slice();

  switch (action.type) {

    case actions.ADD_ASSIGNMENT:
      return [...state, action.assignment];

    case actions.UPDATE_ASSIGNMENT:
      let assignmentToUpdate = assignmentWeeksList[action.index];
      assignmentToUpdate.text = action.assignment.text;
      assignmentWeeksList.splice(action.index, 1, assignmentToUpdate);
      return assignmentWeeksList;

    case actions.DELETE_ASSIGNMENT:
    assignmentWeeksList.splice(action.index, 1);
    return assignmentWeeksList;

    case actions.FETCH_ASSIGNMENTS:
      return [...state, ...action.assignments];

    default:
      return state;
  }
}