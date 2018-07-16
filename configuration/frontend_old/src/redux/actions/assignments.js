import actions from '../constants';
const {
  FETCH_ASSIGNMENTS
} = actions;



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
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
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
            return dispatch({type: 'ADD_ASSIGNMENT', assignment: res.data});
          } else if (res.status === 401 || res.status === 403) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
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
            return dispatch({type: 'UPDATE_ASSIGNMENT', assignment: res.data, index});
          } else if (res.status === 401 || res.status === 403) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
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
            return dispatch({type: 'DELETE_ASSIGNMENT', index});
          } else if (res.status === 401 || res.status === 403) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          }
        });
    };
  };

  // Group Lists

  // export const addGroupList = text => {
  //   return (dispatch, getState) => {
  //     let headers = {"Content-Type": "application/json"};
  //     let {token} = getState().auth;

  //     if (token) {
  //       headers["Authorization"] = `Token ${token}`;
  //     }
  //     let body = JSON.stringify({
  //       groups: [],
  //       group_list_title: this.state.newGrouplistTitle
  //   });

  //     let body = JSON.stringify({text, });
  //     return fetch("/api/assignments/", {headers, method: "POST", body})
  //       .then(res => {
  //         if (res.status < 500) {
  //           return res.json().then(data => {
  //             return {status: res.status, data};
  //           });
  //         } else {
  //           console.log("Server Error!");
  //           throw res;
  //         }
  //       })
  //       .then(res => {
  //         if (res.status === 201) {
  //           return dispatch({type: 'ADD_ASSIGNMENT', assignment: res.data});
  //         } else if (res.status === 401 || res.status === 403) {
  //           dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
  //           throw res.data;
  //         }
  //       });
  //   };
  // };


  //       if (this.state.newGrouplistTitle.length) {
  //           fetch("todo/grouplists/", {headers, body, method: "POST"})
  //               .then(res=>{
  //                   if (res.status < 500) {
  //                       return res.json().then(data => {
  //                           return this._fetchGroupList();
  //                       });
  //                   } else {
  //                       console.log("Server Error!");
  //                       throw res;
  //                   }
  //               });
  //       }