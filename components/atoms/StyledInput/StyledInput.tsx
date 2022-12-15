import React from "react";
import S from "./StyledInput.module.scss";

interface IProps {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  isCorrect?: boolean;
}

export const StyledInput: React.FC<IProps> = ({
  name,
  type = "text",
  placeholder = name,
  setValue,
  value,
  isCorrect = true,
}) => {
  return (
    <label className={[S.label, !isCorrect && S.labelError].join(" ")}>
      {name}
      <input
        className={S.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
};
