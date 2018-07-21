import {beginAjaxCall, ajaxCallError} from './ajaxStatus';
import { ADD_NOTE_SUCCESS, UPDATE_NOTE_SUCCESS, DELETE_NOTE_SUCCESS, FETCH_NOTES_SUCCESS, AUTHENTICATION_ERROR } from '../actionTypes';

export const fetchNotes = () => {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/api/notes/", {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status,  data};
          });
        } else {
          console.log("Server Error!");
          dispatch(ajaxCallError(res.data));
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: FETCH_NOTES_SUCCESS, notes: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: AUTHENTICATION_ERROR, data: res.data});
          dispatch(ajaxCallError(res.data));
          throw res.data;
        }
      });
  };
};

export const addNote = text => {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({text, });
    return fetch("/api/notes/", {headers, method: "POST", body})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          });
        } else {
          console.log("Server Error!");
          dispatch(ajaxCallError(res.data));
          throw res;
        }
      })
      .then(res => {
        if (res.status === 201) {
          return dispatch({type: ADD_NOTE_SUCCESS, note: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: AUTHENTICATION_ERROR, data: res.data});
          dispatch(ajaxCallError(res.data));
          throw res.data;
        }
      });
  };
};

export const updateNote = (index, text) => {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({text, });
    let noteId = getState().notes[index].id;

    return fetch(`/api/notes/${noteId}/`, {headers, method: "PUT", body})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          });
        } else {
          console.log("Server Error!");
          dispatch(ajaxCallError(res.data));
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: UPDATE_NOTE_SUCCESS, note: res.data, index});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: AUTHENTICATION_ERROR, data: res.data});
          dispatch(ajaxCallError(res.data));
          throw res.data;
        }
      });
  };
};

export const deleteNote = index => {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let noteId = getState().notes[index].id;

    return fetch(`/api/notes/${noteId}/`, {headers, method: "DELETE"})
      .then(res => {
        if (res.status === 204) {
          return {status: res.status, data: {}};
        } else if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          });
        } else {
          console.log("Server Error!");
          dispatch(ajaxCallError(res.data));
          throw res;
        }
      })
      .then(res => {
        if (res.status === 204) {
          return dispatch({type: DELETE_NOTE_SUCCESS, index});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: AUTHENTICATION_ERROR, data: res.data});
          dispatch(ajaxCallError(res.data));
          throw res.data;
        }
      });
  };
};