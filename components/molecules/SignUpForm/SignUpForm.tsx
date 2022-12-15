import React from "react";
import { StyledInput } from "../../index";
import S from "./SignUpForm.module.scss";

export const SignUpForm: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <form className={S.signUpForm}>
      <StyledInput
        name="Nazwa użytkownika"
        value={username}
        setValue={setUsername}
      />
      <StyledInput name="Email" value={email} setValue={setEmail} />
      <StyledInput
        name="Hasło"
        value={password}
        setValue={setPassword}
        type="password"
      />
    </form>
  );
};
