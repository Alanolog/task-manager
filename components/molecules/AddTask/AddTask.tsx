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
    createTask: (name: String) =>
      dispatch(
        //@ts-ignore redux thunk dont work with ts properly
        createTask(name)
      ),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {}

const AddTask: React.FC<Props> = ({ isWaiting, createTask }) => {
  const [name, setName] = React.useState({ value: "", isValid: true });

  const isValidName = (name: string) => name?.length <= 20 && name?.length >= 1;
  const isValid = isValidName(name.value);

  const createTaskBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setName({ ...name, isValid: isValidName(name.value) });
    if (isValid) {
      //@ts-ignore redux thunk dont work with ts properly
      createTask(name.value);
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
