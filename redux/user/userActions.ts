import axios, { AxiosResponse } from "axios";
import { authResponse } from "../../models";
import {
  POST_REGISTER_REQUEST,
  POST_REGISTER_FAILURE,
  POST_REGISTER_SUCCESS,
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

export const registerAction = (
  username: string,
  email: string,
  password: string
) => {
  return (dispatch) => {
    dispatch(postRegisterRequest);
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
      .catch((error: { msg: string }) => {
        const errorMsg = error.msg;
        dispatch(postRegisterFailure(errorMsg));
      });
  };
};
