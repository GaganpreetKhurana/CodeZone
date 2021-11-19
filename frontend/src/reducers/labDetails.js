const {
    FETCH_LAB_DETAILS,
    CLEAR_LAB_DETAILS
  } = require("../actions/actionTypes");
  
  const initialClassState = {
    labDetails: [],
  };
  
  export default function auth(state = initialClassState, action) {
    switch (action.type) {
      case FETCH_LAB_DETAILS:
        return {
          ...state,
          labDetails: action.labDetails,
        };
      case CLEAR_LAB_DETAILS:
        return {
          ...state,
          labDetails: [],
        };
      default:
        return state;
    }
  }
  