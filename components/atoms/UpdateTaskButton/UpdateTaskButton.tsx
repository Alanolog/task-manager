import React from "react";
import S from "./UpdateTaskButton.module.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { patchTask, fetchSingleTask } from "../../../redux";
import { StyledInput, StyledTextarea } from "../../index";
import { store, singleTask } from "../../../models";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (store: store) => ({
  task: store.tasks.singleTask,
  isWaiting: store.tasks.loading,
});

const mapDispatchToProps = () => {
  const dispatch = useAppDispatch();
  return {
    fetchSingleTask: (taskID: String) =>
      dispatch(
        //@ts-ignore redux thunk dont work with ts properly
        fetchSingleTask(taskID)
      ),
    patchTask: (taskID: String, name: String, description: String) =>
      dispatch(
        //@ts-ignore redux thunk dont work with ts properly
        patchTask(taskID, name, description)
      ),
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
  fetchSingleTask,
  patchTask,
  taskData,
}) => {
  const [isModalOpened, setIsModalOpened] = React.useState(false);

  const [name, setName] = React.useState({
    value: "",
    isValid: true,
  });
  const [description, setDescription] = React.useState({
    value: "",
    isValid: true,
  });

  const isValidName = (name: string) => name?.length <= 20 && name?.length >= 1;
  const isValidDescription = (description: string) => description?.length >= 1;
  const isValid =
    isValidName(name.value) && isValidDescription(description.value);

  const patchTaskButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setName({ ...name, isValid: isValidName(name.value) });
    setDescription({
      ...description,
      isValid: isValidDescription(description.value),
    });
    if (isValid) {
      patchTask(taskID, name.value, description.value);
    }
  };
  React.useEffect(() => {
    setName({ value: task.name, isValid: isValidName(task.name) });
    setDescription({
      value: task.description,
      isValid: isValidDescription(task.description),
    });
  }, [task]);
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
          <button
            className={S.patchTaskButton}
            style={{
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
