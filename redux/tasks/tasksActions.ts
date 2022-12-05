import axios, { AxiosResponse } from "axios";
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_SUCCESS,
} from "./taskTypes";
import { singleTask } from "../../models";

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
  return (dispatch: any) => {
    dispatch(fetchTasksRequest);
    axios
      .get("https://alan-rutyna-api.onrender.com/api/v1/tasks", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzhkY2FhYjAyYjQzNDgxNDRkMGNkYjAiLCJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2NzAyNTMzMTYsImV4cCI6MTY3MDg1ODExNn0.QYTsEWkhCY_QxDUAOjAHEN5RP2xlyGvSjETNTpo7DqU",
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
      .catch((error: { message: string }) => {
        const errorMsg = error.message;
        dispatch(fetchTasksFailure(errorMsg));
      });
  };
};
