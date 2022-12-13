import {
  POST_REGISTER_REQUEST,
  POST_REGISTER_FAILURE,
  POST_REGISTER_SUCCESS,
  POST_LOGIN_REQUEST,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS,
} from "./userTypes";

let windowToken;
if (typeof window !== "undefined") {
  windowToken = window?.localStorage?.getItem("token");
}
const initialState = {
  loading: false,
  userData: {
    token: windowToken,
    user: { username: "" },
  },
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
      window.localStorage.removeItem("token");
      return {
        loading: false,
        userData: {
          token: null,
          user: { username: "" },
        },
        error: action.payload,
      };
    }
    case POST_REGISTER_SUCCESS: {
      window.localStorage.setItem("token", action.payload.token);
      return {
        loading: false,
        userData: action.payload,
        error: "",
      };
    }

    case POST_LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case POST_LOGIN_FAILURE: {
      window.localStorage.removeItem("token");
      return {
        loading: false,
        userData: {
          token: null,
          user: { username: "" },
        },
        error: action.payload,
      };
    }
    case POST_LOGIN_SUCCESS: {
      window.localStorage.setItem("token", action.payload.token);
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
