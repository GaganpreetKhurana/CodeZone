const { SELECT_LANGUAGE } = require("../actions/actionTypes");

const initialLanguageState = {
  editorLanguage: "cpp",
};

export default function language(state = initialLanguageState, action) {
  switch (action.type) {
    case SELECT_LANGUAGE:
      return {
        ...state,
        editorLanguage: action.language,
      };
    default:
      return state;
  }
}