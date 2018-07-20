export const loadUser = () => {
    return (dispatch, getState) => {
      dispatch({type: "USER_LOADING"});

      const token = getState().auth.token;

      let headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }
      return fetch("api/auth/user/", {headers, })
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            });
          } else {
            console.log("Server Error!"); // eslint-disable-line
            throw res;
          }
        })
        .then(res => {
          if (res.status === 200) {
            dispatch({type: 'USER_LOADED', user: res.data });
            return res.data;
          } else if (res.status >= 400 && res.status < 500) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          }
        });
    };
};

export const login = (username, password) => {
  return (dispatch) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({username, password});

    return fetch("api/auth/login/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          });
        } else {
          console.log("Server Error!"); // eslint-disable-line
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'LOGIN_SUCCESS', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "LOGIN_FAIL", data: res.data});
          throw res.data;
        }
      });
  };
};

export const register = (username, email, password, accountType) => {
  return (dispatch) => {
    console.log(accountType);
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({username, email, password, accountType});
    return fetch("/api/auth/register/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          });
        } else {
          console.log("Server Error!"); // eslint-disable-line
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'REGISTRATION_SUCCESS', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "REGISTRATION_FAIL", data: res.data});
          throw res.data;
        }
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};

    return fetch("/api/auth/logout/", {headers, body: "", method: "POST"})
      .then(res => {
        if (res.status === 204) {
          return {status: res.status, data: {}};
        } else if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          });
        } else {
          console.log("Server Error!"); // eslint-disable-line
          throw res;
        }
      })
      .then(res => {
        if (res.status === 204) {
          dispatch({type: 'LOGOUT_SUCCESS'});
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      });
  };
};