const {
  SWITCH_THEME
} = require("../actions/actionTypes");

const initialThemeState = {
  darkMode: true,
};

export default function theme(state = initialThemeState, action) {
  switch (action.type) {
    case SWITCH_THEME:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
}
