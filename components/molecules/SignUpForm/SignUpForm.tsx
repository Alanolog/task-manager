import React from "react";
import { StyledInput } from "../../index";
import S from "./SignUpForm.module.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { registerAction } from "../../../redux";

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <form className={S.signUpForm}>
      <StyledInput name="Username" value={username} setValue={setUsername} />
      <StyledInput name="Email" value={email} setValue={setEmail} />
      <StyledInput
        name="Password"
        value={password}
        setValue={setPassword}
        type="password"
      />
      <button
        className="authButton"
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            //@ts-ignore redux thunk dont work with ts properly
            registerAction(username, email, password)
          );
        }}
      >
        Sign Up
      </button>
    </form>
  );
};
