import axios, { AxiosResponse } from "axios";
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_SINGLE_TASK_REQUEST,
  FETCH_SINGLE_TASK_FAILURE,
  FETCH_SINGLE_TASK_SUCCESS,
  CREATE_TASK_REQUEST,
  CREATE_TASK_FAILURE,
  CREATE_TASK_SUCCESS,
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

export const fetchSingleTaskRequest = () => {
  return {
    type: FETCH_SINGLE_TASK_REQUEST,
  };
};
export const fetchSingleTaskFailure = (error: any) => {
  return {
    type: FETCH_SINGLE_TASK_FAILURE,
    payload: error,
  };
};

export const fetchSingleTaskSuccess = (task: singleTask) => {
  return {
    type: FETCH_SINGLE_TASK_SUCCESS,
    payload: task,
  };
};

export const createTaskRequest = () => {
  return {
    type: CREATE_TASK_REQUEST,
  };
};
export const createTaskFailure = (error: any) => {
  return {
    type: CREATE_TASK_FAILURE,
    payload: error,
  };
};

export const createTaskSuccess = (task: singleTask) => {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: task,
  };
};

// to fix after work - dont use

export const createTask = (name: String, description: String) => {
  return (dispatch: Dispatch) => {
    dispatch(createTaskRequest());
    axios
      .post(
        "https://alan-rutyna-api.onrender.com/api/v1/tasks",
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      )
      .then((response: AxiosResponse<{ task: singleTask }>) => {
        const task = response?.data?.task;
        dispatch(createTaskSuccess(task));
      })
      .catch((error: { msg: string }) => {
        console.log(error);
        const errorMsg = error.msg;
        dispatch(createTaskFailure(errorMsg));
      });
  };
};

export const fetchSingleTask = (taskID: String) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchSingleTaskRequest());
    axios
      .get(`https://alan-rutyna-api.onrender.com/api/v1/task/${taskID}`, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      })
      .then((response: AxiosResponse<{ task: singleTask }>) => {
        const task = response?.data?.task;
        dispatch(fetchSingleTaskSuccess(task));
      })
      .catch((error: { msg: string }) => {
        const errorMsg = error.msg;
        dispatch(fetchSingleTaskFailure(errorMsg));
      });
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
