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
} from "./taskTypes";

const initialState = {
  loading: false,
  tasks: [],
  singleTask: {},
  error: "",
};

const taskReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_TASKS_FAILURE: {
      return {
        loading: false,
        tasks: [],
        singleTask: {},
        error: action.payload,
      };
    }
    case FETCH_TASKS_SUCCESS: {
      return {
        loading: false,
        tasks: action.payload,
        singleTask: {},
        error: "",
      };
    }
    case FETCH_SINGLE_TASK_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_SINGLE_TASK_FAILURE: {
      return {
        loading: false,
        tasks: [],
        singleTask: {},
        error: action.payload,
      };
    }
    case FETCH_SINGLE_TASK_SUCCESS: {
      return {
        loading: false,
        tasks: [],
        singleTask: action.payload,
        error: "",
      };
    }
    case CREATE_TASK_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CREATE_TASK_FAILURE: {
      return {
        loading: false,
        tasks: [],
        singleTask: {},
        error: action.payload,
      };
    }
    case CREATE_TASK_SUCCESS: {
      return {
        loading: false,
        tasks: [],
        singleTask: action.payload,
        error: "",
      };
    }
    case PATCH_TASK_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case PATCH_TASK_FAILURE: {
      return {
        loading: false,
        tasks: [],
        singleTask: {},
        error: action.payload,
      };
    }
    case PATCH_TASK_SUCCESS: {
      return {
        loading: false,
        tasks: [],
        singleTask: action.payload,
        error: "",
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
