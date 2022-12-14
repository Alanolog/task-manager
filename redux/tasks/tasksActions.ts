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
  PATCH_TASK_REQUEST,
  PATCH_TASK_FAILURE,
  PATCH_TASK_SUCCESS,
  DELETE_TASK_REQUEST,
  DELETE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
} from "./taskTypes";
import { singleTask } from "../../models";
import { Dispatch } from "redux";

let windowToken: string | null;
if (typeof window !== "undefined") {
  windowToken = window?.localStorage?.getItem("token");
}

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

export const patchTaskRequest = () => {
  return {
    type: PATCH_TASK_REQUEST,
  };
};
export const patchTaskFailure = (error: any) => {
  return {
    type: PATCH_TASK_FAILURE,
    payload: error,
  };
};

export const patchTaskSuccess = (task: singleTask) => {
  return {
    type: PATCH_TASK_SUCCESS,
    payload: task,
  };
};

export const deleteTaskRequest = () => {
  return {
    type: DELETE_TASK_REQUEST,
  };
};
export const deleteTaskFailure = (error: any) => {
  return {
    type: DELETE_TASK_FAILURE,
    payload: error,
  };
};

export const deleteTaskSuccess = () => {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: "Success",
  };
};

export const createTask = (name: String) => {
  if (typeof window !== "undefined" && windowToken === null) {
    windowToken = window?.localStorage?.getItem("token");
  }
  return (dispatch: Dispatch) => {
    dispatch(createTaskRequest());
    axios
      .post(
        "https://alan-rutyna-api.onrender.com/api/v1/tasks",
        {
          name: name,
        },
        {
          headers: {
            Authorization: "Bearer " + windowToken,
          },
        }
      )
      .then((response: AxiosResponse<{ task: singleTask }>) => {
        const task = response?.data?.task;
        dispatch(createTaskSuccess(task));
      })
      .catch((error) => {
        dispatch(createTaskFailure(error));
      });
  };
};
export const patchTask = (taskID: String, name?: String, isDone?: boolean) => {
  if (typeof window !== "undefined" && windowToken === null) {
    windowToken = window?.localStorage?.getItem("token");
  }
  return (dispatch: Dispatch) => {
    dispatch(patchTaskRequest());
    axios
      .patch(
        `https://alan-rutyna-api.onrender.com/api/v1/tasks/${taskID}`,
        {
          name,
          isDone,
        },
        {
          headers: {
            Authorization: "Bearer " + windowToken,
          },
        }
      )
      .then((response: AxiosResponse<{ task: singleTask }>) => {
        const task = response?.data?.task;
        dispatch(patchTaskSuccess(task));
      })
      .catch((error) => {
        dispatch(patchTaskFailure(error));
      });
  };
};
export const deleteTask = (taskID: String) => {
  if (typeof window !== "undefined" && windowToken === null) {
    windowToken = window?.localStorage?.getItem("token");
  }
  return (dispatch: Dispatch) => {
    dispatch(deleteTaskRequest());
    axios
      .delete(`https://alan-rutyna-api.onrender.com/api/v1/tasks/${taskID}`, {
        headers: {
          Authorization: "Bearer " + windowToken,
        },
      })
      .then(() => {
        dispatch(deleteTaskSuccess());
      })
      .catch((error) => {
        dispatch(deleteTaskFailure(error));
      });
  };
};

export const fetchSingleTask = (taskID: String) => {
  if (typeof window !== "undefined" && windowToken === null) {
    windowToken = window?.localStorage?.getItem("token");
  }
  return (dispatch: Dispatch) => {
    dispatch(fetchSingleTaskRequest());
    axios
      .get(`https://alan-rutyna-api.onrender.com/api/v1/tasks/${taskID}`, {
        headers: {
          Authorization: "Bearer " + windowToken,
        },
      })
      .then((response: AxiosResponse<{ task: singleTask }>) => {
        const task = response?.data?.task;
        dispatch(fetchSingleTaskSuccess(task));
      })
      .catch((error) => {
        dispatch(fetchSingleTaskFailure(error));
      });
  };
};

export const fetchTasks = () => {
  if (typeof window !== "undefined" && windowToken === null) {
    windowToken = window?.localStorage?.getItem("token");
  }
  return (dispatch: Dispatch) => {
    dispatch(fetchTasksRequest());
    axios
      .get("https://alan-rutyna-api.onrender.com/api/v1/tasks", {
        headers: {
          Authorization: "Bearer " + windowToken,
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
      .catch((error) => {
        dispatch(fetchTasksFailure(error));
      });
  };
};
