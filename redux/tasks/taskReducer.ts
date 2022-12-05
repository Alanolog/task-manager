import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_SUCCESS,
} from "./taskTypes";

const initialState = {
  loading: false,
  tasks: [],
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
        error: action.payload,
      };
    }
    case FETCH_TASKS_SUCCESS: {
      return {
        loading: false,
        tasks: action.payload,
        error: "",
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
