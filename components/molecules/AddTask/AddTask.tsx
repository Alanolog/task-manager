import React from "react";
import S from "./AddTask.module.scss";
import { StyledInput } from "../../index";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createTask } from "../../../redux";

export const AddTask: React.FC = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = React.useState({ value: "", isValid: true });
  const [description, setDescription] = React.useState({
    value: "",
    isValid: true,
  });
  const isWaiting = useAppSelector((store) => store.tasks.loading);

  const isValidName = (name: string) => name.length <= 20 && name.length >= 1;
  const isValidDescription = (description: string) => description.length >= 1;
  const isValid =
    isValidName(name.value) && isValidDescription(description.value);

  const createTaskBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setName({ ...name, isValid: isValidName(name.value) });
    setDescription({
      ...description,
      isValid: isValidDescription(description.value),
    });
    if (isValid) {
      //@ts-ignore redux thunk dont work with ts properly
      dispatch(createTask(name.value, description.value));
    }
  };

  return (
    <div className={S.addTaskBox}>
      <div className={S.addTaskInputBox}>
        {" "}
        <StyledInput
          value={name.value}
          onChange={(e) =>
            setName({
              isValid: isValidName(e.target.value),
              value: e.target.value,
            })
          }
          isCorrect={name.isValid}
          placeholder={"task name"}
          errorMessage={"name should be between 1 and 20 characters"}
        />
        <StyledInput
          value={description.value}
          onChange={(e) =>
            setDescription({
              isValid: isValidDescription(e.target.value),
              value: e.target.value,
            })
          }
          isCorrect={description.isValid}
          placeholder={"task description"}
          errorMessage={"must provide description"}
        />
      </div>
      <button
        className={S.addTaskButton}
        style={{
          opacity: isValid && !isWaiting ? 1 : 0.5,
          cursor: isValid && !isWaiting ? "pointer" : "auto",
        }}
        onClick={(e) =>
          isValid && !isWaiting ? createTaskBtnHandler(e) : e.preventDefault()
        }
      >
        {isWaiting ? <div className={S.loader}></div> : "+"}
      </button>
    </div>
  );
};
