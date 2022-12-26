import React from "react";
import S from "./StyledTextarea.module.scss";

interface IProps {
  name?: string;
  placeholder?: string;
  value: string;
  isCorrect?: boolean;
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export const StyledTextarea: React.FC<IProps> = ({
  name,
  placeholder = name,
  value,
  isCorrect = true,
  errorMessage,
  onChange,
}) => {
  const autoGrow = (element: React.FormEvent<HTMLTextAreaElement>) => {
    const target = element.target as HTMLInputElement;
    target.style.height = "5px";
    target.style.height = target.scrollHeight + 5 + "px";
  };

  return (
    <label className={[S.label, !isCorrect && S.labelError].join(" ")}>
      {name}
      <textarea
        className={S.textarea}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInput={(e) => autoGrow(e)}
      />
      <p>{isCorrect === false ? errorMessage : "ㅤ"}</p>
    </label>
  );
};
