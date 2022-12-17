import React from "react";
import { StyledInput } from "../../index";
import S from "./LoginForm.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { loginAction } from "../../../redux";
import { validateEmail } from "../../../models/validateEmail";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const requestErrorMsg = useAppSelector((store) => store.user.error);
  const requestUsername = useAppSelector(
    (store) => store.user.userData?.user?.username
  );

  const [email, setEmail] = React.useState({ value: "", isValid: true });
  const [password, setPassword] = React.useState({ value: "", isValid: true });

  const isValidEmail = (email: string) => validateEmail(email);

  const isValidPassword = (password: string) => password.length >= 6;

  const isValid =
    email.value.length &&
    password.value.length &&
    email.isValid &&
    password.isValid
      ? true
      : null;

  const loginBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setEmail({ ...email, isValid: isValidEmail(email.value) });
    setPassword({ ...password, isValid: isValidPassword(password.value) });
    if (isValid) {
      dispatch(
        //@ts-ignore redux thunk dont work with ts properly
        loginAction(email.value, password.value)
      );
    }
  };

  return (
    <form className={S.loginForm}>
      <h2>Login</h2>
      <StyledInput
        name="Email"
        value={email.value}
        isCorrect={email.isValid}
        onChange={(e) => {
          setEmail({
            isValid: isValidEmail(e.target.value),
            value: e.target.value,
          });
        }}
        errorMessage={"Please provide valid email!"}
      />
      <StyledInput
        name="Password"
        type="password"
        value={password.value}
        isCorrect={password.isValid}
        onChange={(e) => {
          setPassword({
            isValid: isValidPassword(e.target.value),
            value: e.target.value,
          });
        }}
        errorMessage={"Please provide valid password!"}
      />
      {isValid && requestErrorMsg.length > 1 ? (
        <p className={S.authError}>Something went wrong try again later...</p>
      ) : isValid && requestUsername.length > 1 ? (
        <p className={S.authSuccess}>Welcome back {requestUsername}</p>
      ) : (
        <p>ㅤ</p>
      )}
      <button
        style={{
          opacity: isValid ? 1 : 0.5,
          cursor: isValid ? "pointer" : "auto",
        }}
        className="authButton"
        onClick={(e) => (isValid ? loginBtnHandler(e) : e.preventDefault())}
      >
        Login
      </button>
    </form>
  );
};
