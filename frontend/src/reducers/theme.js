const {
  SWITCH_THEME
} = require("../actions/actionTypes");

const initialThemeState = {
  darkMode: false,
};

export default function theme(state = initialThemeState, action) {
  switch (action.type) {
    case SWITCH_THEME:
      return {
        ...state,
        darkMode: !darkMode,
      };
    default:
      return state;
  }
}
