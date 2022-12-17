import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { authResponse } from "../../models";
import {
  POST_REGISTER_REQUEST,
  POST_REGISTER_FAILURE,
  POST_REGISTER_SUCCESS,
  POST_LOGIN_REQUEST,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SUCCESS,
} from "./userTypes";
export const postRegisterRequest = () => {
  return {
    type: POST_REGISTER_REQUEST,
  };
};
export const postRegisterSuccess = (userData: authResponse) => {
  return {
    type: POST_REGISTER_SUCCESS,
    payload: userData,
  };
};

export const postRegisterFailure = (error: any) => {
  return {
    type: POST_REGISTER_FAILURE,
    payload: error,
  };
};

export const postLoginRequest = () => {
  return {
    type: POST_LOGIN_REQUEST,
  };
};
export const postLoginSuccess = (userData: authResponse) => {
  return {
    type: POST_LOGIN_SUCCESS,
    payload: userData,
  };
};

export const PostLoginFailure = (error: any) => {
  return {
    type: POST_LOGIN_FAILURE,
    payload: error,
  };
};

export const registerAction = (
  username: string,
  email: string,
  password: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(postRegisterRequest());
    axios
      .post("https://alan-rutyna-api.onrender.com/api/v1/auth/register", {
        username,
        email,
        password,
      })
      .then((response: AxiosResponse<authResponse>) => {
        const userData = response?.data;
        dispatch(postRegisterSuccess(userData));
      })
      .catch((error: { message: string }) => {
        const errorMsg = error.message;
        dispatch(postRegisterFailure(errorMsg));
      });
  };
};

export const loginAction = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(postLoginRequest());
    axios
      .post("https://alan-rutyna-api.onrender.com/api/v1/auth/login", {
        email,
        password,
      })
      .then((response: AxiosResponse<authResponse>) => {
        const userData = response?.data;
        dispatch(postLoginSuccess(userData));
      })
      .catch((error: { message: string }) => {
        const errorMsg = error.message;
        dispatch(PostLoginFailure(errorMsg));
      });
  };
};
