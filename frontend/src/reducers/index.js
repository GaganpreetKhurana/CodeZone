import { combineReducers } from "redux";
import auth from "./auth";
import createClassroom from "./createClassroom";

export default combineReducers({ auth, createClassroom });
