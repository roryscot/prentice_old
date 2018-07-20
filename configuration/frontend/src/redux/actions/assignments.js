import { ADD_ASSIGNMENT, UPDATE_ASSIGNMENT, DELETE_ASSIGNMENT, FETCH_ASSIGNMENTS, AUTHENTICATION_ERROR } from '../actionTypes';


export const fetchAssignments = () => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
      let {token} = getState().auth;

      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }

      return fetch("/api/assignments/", {headers, })
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
          return {status: res.status,  data};
            });
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 200) {
          console.log("DATA",res.data);

            return dispatch({type: FETCH_ASSIGNMENTS, assignments: res.data});
          } else if (res.status === 401 || res.status === 403) {
            dispatch({type: AUTHENTICATION_ERROR, data: res.data});
            throw res.data;
          }
        });
    };
  };

  export const addAssignment = text => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
      let {token} = getState().auth;

      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }

      let body = JSON.stringify({text, });
      return fetch("/api/assignments/", {headers, method: "POST", body})
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            });
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 201) {
            return dispatch({type: ADD_ASSIGNMENT, assignment: res.data});
          } else if (res.status === 401 || res.status === 403) {
            dispatch({type: AUTHENTICATION_ERROR, data: res.data});
            throw res.data;
          }
        });
    };
  };

  export const updateAssignment = (index, text) => {
    return (dispatch, getState) => {

      let headers = {"Content-Type": "application/json"};
      let {token} = getState().auth;

      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }

      let body = JSON.stringify({text, });
      let assignmentId = getState().assignments[index].id;

      return fetch(`/api/assignments/${assignmentId}/`, {headers, method: "PUT", body})
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            });
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 200) {
            return dispatch({type: UPDATE_ASSIGNMENT, assignment: res.data, index});
          } else if (res.status === 401 || res.status === 403) {
            dispatch({type: AUTHENTICATION_ERROR, data: res.data});
            throw res.data;
          }
        });
    };
  };

  export const deleteAssignment = index => {
    return (dispatch, getState) => {

      let headers = {"Content-Type": "application/json"};
      let {token} = getState().auth;

      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }

      let assignmentId = getState().assignments[index].id;

      return fetch(`/api/assignments/${assignmentId}/`, {headers, method: "DELETE"})
        .then(res => {
          if (res.status === 204) {
            return {status: res.status, data: {}};
          } else if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            });
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 204) {
            return dispatch({type: DELETE_ASSIGNMENT, index});
          } else if (res.status === 401 || res.status === 403) {
            dispatch({type: AUTHENTICATION_ERROR, data: res.data});
            throw res.data;
          }
        });
    };
  };