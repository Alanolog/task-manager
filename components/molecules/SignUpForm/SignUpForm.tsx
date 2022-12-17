import React from "react";
import { StyledInput } from "../../index";
import S from "./SignUpForm.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { registerAction } from "../../../redux";
import { validateEmail } from "../../../models/validateEmail";

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const requestErrorMsg = useAppSelector((store) => store.user.error);

  const [username, setUsername] = React.useState({ value: "", isValid: true });
  const [email, setEmail] = React.useState({ value: "", isValid: true });
  const [password, setPassword] = React.useState({ value: "", isValid: true });

  const isValidUsername = (username: string) =>
    username.length >= 3 && username.length <= 20;

  const isValidEmail = (email: string) => validateEmail(email);

  const isValidPassword = (password: string) => password.length >= 6;

  const isValid =
    username.isValid &&
    email.isValid &&
    password.isValid &&
    username.value &&
    email.value &&
    password.value;

  const signUpBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setUsername({ ...username, isValid: isValidUsername(username.value) });
    setEmail({ ...email, isValid: isValidEmail(email.value) });
    setPassword({ ...password, isValid: isValidPassword(password.value) });
    if (isValid) {
      dispatch(
        //@ts-ignore redux thunk dont work with ts properly
        registerAction(username.value, email.value, password.value)
      );
    }
  };

  return (
    <form className={S.signUpForm}>
      <StyledInput
        name="Username"
        value={username.value}
        isCorrect={username.isValid}
        onChange={(e) => {
          setUsername({
            isValid: isValidUsername(e.target.value),
            value: e.target.value,
          });
        }}
        errorMessage={"Please provide valid username!"}
      />
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
      {requestErrorMsg.length > 1 ? (
        <p>Something went wrong try again later...</p>
      ) : (
        <p>ㅤ</p>
      )}
      <button
        style={{
          opacity: isValid ? 1 : 0.5,
          cursor: isValid ? "pointer" : "auto",
        }}
        className="authButton"
        onClick={(e) => (isValid ? signUpBtnHandler(e) : e.preventDefault())}
      >
        Sign Up
      </button>
    </form>
  );
};
