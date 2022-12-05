import { combineReducers } from "redux";
import taskReducer from "./tasks/taskReducer";
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({ tasks: taskReducer });

export default rootReducer;
