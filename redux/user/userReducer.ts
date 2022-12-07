import {
  POST_REGISTER_REQUEST,
  POST_REGISTER_FAILURE,
  POST_REGISTER_SUCCESS,
} from "./userTypes";

const initialState = {
  loading: false,
  userData: { token: undefined, user: { username: "" } },
  error: "",
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case POST_REGISTER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case POST_REGISTER_FAILURE: {
      return {
        loading: false,
        userData: {
          token: undefined,
          user: { username: "" },
        },
        error: action.payload,
      };
    }
    case POST_REGISTER_SUCCESS: {
      return {
        loading: false,
        userData: action.payload,
        error: "",
      };
    }
    default:
      return state;
  }
};

export default userReducer;
