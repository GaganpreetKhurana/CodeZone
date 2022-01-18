import { SELECT_LANGUAGE } from "./actionTypes";

//login
export function languageSelect(language) {
  return {
    type: SELECT_LANGUAGE,
    language,
  };
}
