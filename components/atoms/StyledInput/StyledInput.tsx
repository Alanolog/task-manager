import React from "react";
import S from "./StyledInput.module.scss";
import { useSelector, useDispatch } from "react-redux";

interface IProps {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

export const StyledInput: React.FC<IProps> = ({
  type = "text",
  placeholder,
}) => {
  return (
    <input className={S.input} type={type} placeholder={placeholder}></input>
  );
};
