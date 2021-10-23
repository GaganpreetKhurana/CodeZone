import { combineReducers } from "redux";
import auth from "./auth";
import createClassroom from "./createClassroom";
import classroom from "./classroom";

export default combineReducers({ auth, createClassroom, classroom });
