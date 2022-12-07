import axios, { AxiosResponse } from "axios";
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_SUCCESS,
} from "./taskTypes";
import { singleTask } from "../../models";
import { Dispatch } from "redux";

export const fetchTasksRequest = () => {
  return {
    type: FETCH_TASKS_REQUEST,
  };
};
export const fetchTasksFailure = (error: any) => {
  return {
    type: FETCH_TASKS_FAILURE,
    payload: error,
  };
};

export const fetchTasksSuccess = (tasks: singleTask[]) => {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
  };
};

export const fetchTasks = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchTasksRequest());
    axios
      .get("https://alan-rutyna-api.onrender.com/api/v1/tasks", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      })
      .then(
        (
          response: AxiosResponse<{ tasks: singleTask[]; nbOfTasks: number }>
        ) => {
          const tasks = response?.data?.tasks;
          dispatch(fetchTasksSuccess(tasks));
        }
      )
      .catch((error: { msg: string }) => {
        const errorMsg = error.msg;
        dispatch(fetchTasksFailure(errorMsg));
      });
  };
};
