export default {
    notes: [],
    auth: {
        token: localStorage.getItem("token"),
        isAuthenticated: false,
        isLoggedIn: false,
        isLoading: true,
        user: null,
        errors: {},
    },
    assignments: [],
    ajaxCallsInProgress: 1,
  };