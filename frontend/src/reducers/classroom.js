const {
    FETCH_USER_CLASS_DETAILS,
  } = require("../actions/actionTypes");
  
  const initialClassroomState = {
    userDetails: {},
  };
  export default function auth(state = initialClassroomState, action) {
    switch (action.type) {
      case FETCH_USER_CLASS_DETAILS:
        return {
          ...state,
          userDetails: action.userDetails,
        };
      default:
        return state;
    }
  }