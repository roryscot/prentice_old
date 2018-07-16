import actions from '../constants';

const initialState = [];


export default function handleNotes(state=initialState, action) {
    let noteList = state.slice();

  switch (action.type) {

    case actions.ADD_NOTE:
      return [...state, action.note];

    case actions.UPDATE_NOTE:
      let noteToUpdate = noteList[action.index];
      noteToUpdate.text = action.note.text;
      noteList.splice(action.index, 1, noteToUpdate);
      return noteList;

    case actions.DELETE_NOTE:
    noteList.splice(action.index, 1);
    return noteList;

    case actions.FETCH_NOTES:
      return [...state, ...action.notes];

    default:
      return state;
  }
}