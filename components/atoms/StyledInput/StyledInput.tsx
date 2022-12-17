import React from "react";
import S from "./StyledInput.module.scss";

interface IProps {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  isCorrect?: boolean;
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const StyledInput: React.FC<IProps> = ({
  name,
  type = "text",
  placeholder = name,
  value,
  isCorrect = true,
  errorMessage,
  onChange,
}) => {
  return (
    <label className={[S.label, !isCorrect && S.labelError].join(" ")}>
      {name}
      <input
        className={S.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p>{isCorrect === false ? errorMessage : "ㅤ"}</p>
    </label>
  );
};
