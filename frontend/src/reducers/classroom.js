const {
    FETCH_USER_CLASS_DETAILS,
  } = require("../actions/actionTypes");
  
  const initialClassroomState = {
    classesCreated: [],
    classesJoined: []
  };
  export default function auth(state = initialClassroomState, action) {
    switch (action.type) {
      case FETCH_USER_CLASS_DETAILS:
        return {
          ...state,
          classesCreated: action.userDetails.classesCreated,
          classesJoined: action.userDetails.classesJoined
        };
      default:
        return state;
    }
  }