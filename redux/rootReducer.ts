import { combineReducers } from "redux";
import taskReducer from "./tasks/taskReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({ tasks: taskReducer, user: userReducer });

export default rootReducer;
