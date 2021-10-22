const {
  CREATE_CLASS_SUCCESS,
  CLEAR_CLASS_CODE,
} = require("../actions/actionTypes");

const initialClassState = {
  code: null,
};

export default function auth(state = initialClassState, action) {
  switch (action.type) {
    case CREATE_CLASS_SUCCESS:
      return {
        ...state,
        code: action.code,
      };
    case CLEAR_CLASS_CODE:
      return {
        ...state,
        code: null,
      };
    default:
      return state;
  }
}
