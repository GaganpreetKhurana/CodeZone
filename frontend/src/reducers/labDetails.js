const {
    FETCH_LAB_DETAILS,
    CLEAR_LAB_DETAILS,
    CREATE_CODE_EDITOR
  } = require("../actions/actionTypes");
  
  const initialClassState = {
    labDetails: [],
    codeEditorDetails:{},
    editorLabDetails:{}
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
      case CREATE_CODE_EDITOR:
        return{
          ...state,
          codeEditorDetails: action.codeEditorDetails,
          editorLabDetails: action.labDetails
        }
      default:
        return state;
    }
  }
  