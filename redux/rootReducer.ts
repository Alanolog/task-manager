import { combineReducers } from "redux";
import taskReducer from "./tasks/taskReducer";
import userReducer from "./user/userReducer";
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({ tasks: taskReducer, user: userReducer });

export default rootReducer;
