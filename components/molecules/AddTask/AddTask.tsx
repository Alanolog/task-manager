import React from "react";
import S from "./AddTask.module.scss";
import { StyledInput, StyledTextarea } from "../../index";
import { createTask } from "../../../redux";

import { useAppDispatch } from "../../../redux/hooks";
import { store } from "../../../models";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (store: store) => ({
  isWaiting: store.tasks.loading,
});

const mapDispatchToProps = () => {
  const dispatch = useAppDispatch();
  return {
    createTask: (name: String, description: String) =>
      dispatch(
        //@ts-ignore redux thunk dont work with ts properly
        createTask(name, description)
      ),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {}

const AddTask: React.FC<Props> = ({ isWaiting, createTask }) => {
  const [name, setName] = React.useState({ value: "", isValid: true });
  const [description, setDescription] = React.useState({
    value: "",
    isValid: true,
  });

  const isValidName = (name: string) => name?.length <= 20 && name?.length >= 1;
  const isValidDescription = (description: string) => description?.length >= 1;
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
      createTask(name.value, description.value);
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
        <StyledTextarea
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
        {isWaiting ? <div className="loader"></div> : "+"}
      </button>
    </div>
  );
};

export default connector(AddTask);
