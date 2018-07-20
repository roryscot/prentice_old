import initialState from './initialState';


  export default function auth(state=initialState.auth, action) {

    switch (action.type) {

      case 'USER_LOADING':
        return {...state, isLoading: true};

      case 'USER_LOADED':
        return {...state, isAuthenticated: true, isLoggedIn: true, isLoading: false, user: action.user};

      case 'LOGIN_SUCCESS':
      case 'REGISTRATION_SUCCESS':
          localStorage.setItem("token", action.data.token);
          return {...state, ...action.data, isAuthenticated: true,
            isLoggedIn: true, isLoading: false, errors: null};

      case 'AUTHENTICATION_ERROR':
      case 'LOGIN_FAIL':
      case 'REGISTRATION_FAIL':
      case 'LOGOUT_SUCCESS':
          localStorage.removeItem("token");
          return {...state, errors: action.data, token: null, user: null,
            isLoggedIn: false, isAuthenticated: false, isLoading: false};
      default:
        return state;
    }
}