import { combineReducers } from "redux";
import auth from "./auth";
import createClassroom from "./createClassroom";
import classroom from "./classroom";
import labDetails from "./labDetails";
import posts from "./posts";
import theme from "./theme";

export default combineReducers({ auth, createClassroom, classroom, theme, labDetails, posts });
