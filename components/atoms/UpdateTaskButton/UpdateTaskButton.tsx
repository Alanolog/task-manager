import React from "react";
import S from "./UpdateTaskButton.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { patchTask, fetchSingleTask } from "../../../redux";

interface IProps {
  taskID: string;
}

export const UpdateTaskButton: React.FC<IProps> = ({ taskID }) => {
  const dispatch = useAppDispatch();
  const task = useAppSelector((store) => store.tasks.singleTask);
  const [isModalOpened, setIsModalOpened] = React.useState(false);

  React.useEffect(() => {
    dispatch(
      //@ts-ignore redux thunk dont work with ts properly
      fetchSingleTask(taskID)
    );
  }, []);
  React.useEffect(() => {}, [isModalOpened]);
  return (
    <div>
      <button className={S.updateButton} onClick={() => setIsModalOpened(true)}>
        Update
      </button>
      {isModalOpened && task ? (
        <div className={S.modal}>
          <div
            className={S.closeButton}
            onClick={() => setIsModalOpened(false)}
          ></div>
        </div>
      ) : null}
    </div>
  );
};
