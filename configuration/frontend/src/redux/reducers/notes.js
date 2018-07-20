import { ADD_NOTE_SUCCESS, UPDATE_NOTE_SUCCESS, DELETE_NOTE_SUCCESS, FETCH_NOTES_SUCCESS } from '../actionTypes';

import initialState from '../initialState';

export default function handleNotes(state=initialState.notes, action) {
    let noteList = state.slice();

  switch (action.type) {

    case ADD_NOTE_SUCCESS:
      return [...state, action.note];

    case UPDATE_NOTE_SUCCESS:
      let noteToUpdate = noteList[action.index];
      noteToUpdate.text = action.note.text;
      noteList.splice(action.index, 1, noteToUpdate);
      return noteList;

    case DELETE_NOTE_SUCCESS:
    noteList.splice(action.index, 1);
    return noteList;

    case FETCH_NOTES_SUCCESS:
      return [...state, ...action.notes];

    default:
      return state;
  }
}