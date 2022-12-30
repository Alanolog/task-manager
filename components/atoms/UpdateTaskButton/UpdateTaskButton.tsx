import React from "react";
import S from "./UpdateTaskButton.module.scss";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { patchTask, fetchSingleTask } from "../../../redux";
import { StyledInput } from "../../index";
import { store, singleTask } from "../../../models";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (store: store) => ({
  task: store.tasks.singleTask,
  isWaiting: store.tasks.loading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, AnyAction>) => {
  return {
    fetchSingleTask: (taskID: String) => dispatch(fetchSingleTask(taskID)),
    patchTask: (taskID: String, name: String, isDone: boolean) =>
      dispatch(patchTask(taskID, name, isDone)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {
  taskID: string;
  taskData: singleTask;
}

const UpdateTaskButton: React.FC<IProps> = ({
  task,
  isWaiting,
  taskID,
  patchTask,
  taskData,
}) => {
  const [isModalOpened, setIsModalOpened] = React.useState(false);

  const [name, setName] = React.useState({
    value: taskData.name,
    isValid: true,
  });
  const [isDone, setIsDone] = React.useState(taskData.isDone);

  const isValidName = (name: string) => name?.length <= 20 && name?.length >= 1;
  const isValid = isValidName(name.value);

  const patchTaskButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setName({ ...name, isValid: isValidName(name.value) });
    if (isValid) {
      patchTask(taskID, name.value, isDone);
    }
  };
  React.useEffect(() => {
    setName({
      value: taskData.name,
      isValid: true,
    });
    setIsDone(taskData.isDone);
  }, [taskData]);
  React.useEffect(() => {}, [isModalOpened]);
  return (
    <div>
      <button
        className={S.patchTaskButton}
        onClick={() => setIsModalOpened(true)}
      >
        Update
      </button>
      {isModalOpened && taskData ? (
        <div className={S.modal}>
          <div
            className={S.closeButton}
            onClick={() => setIsModalOpened(false)}
          ></div>
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
          <div className={S.isDoneContainer}>
            task completed?
            <div
              className={isDone ? S.isDoneBoxTrue : S.isDoneBoxFalse}
              onClick={() => setIsDone(!isDone)}
            ></div>
          </div>
          <button
            className={S.patchTaskButton}
            style={{
              marginTop: "2rem",
              opacity: isValid && !isWaiting ? 1 : 0.5,
              cursor: isValid && !isWaiting ? "pointer" : "auto",
            }}
            onClick={(e) =>
              isValid && !isWaiting
                ? patchTaskButtonHandler(e)
                : e.preventDefault()
            }
          >
            {isWaiting ? <div className="loader"></div> : "Update"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default connector(UpdateTaskButton);
