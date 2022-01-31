const {
  CREATE_CLASS_START,
  CREATE_CLASS_FAILURE,
  CREATE_CLASS_SUCCESS,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_STATE,
} = require("../actions/actionTypes");

const initialAuthState = {
  user: {},//name email sid _id role of user can be found in this sent by backend at time of login and signup
  error: null,
  isLoggedIn: false,
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };

    case CREATE_CLASS_START:
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      console.log("Auth updated");
      return {
        ...state,
        user: action.user,
        inProgress: false,
        error: null,
        isLoggedIn: true,
      };
    case CREATE_CLASS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        error: null,
      }
    case CREATE_CLASS_FAILURE:
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
