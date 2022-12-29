import React from "react";
import S from "./SingleTask.module.scss";
import { singleTask } from "../../../models";
import { useAppDispatch } from "../../../redux/hooks";
import { deleteTask } from "../../../redux";
import { UpdateTaskButton } from "../../index";
interface IProps {
  task: singleTask;
}

export const SingleTask: React.FC<IProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={`${S.task} ${task.isDone ? S.doneTask : ""}`}>
      <h5>{task.name}</h5>
      <p>{task.description}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <UpdateTaskButton taskID={task._id} taskData={task} />
        <button
          onClick={() =>
            dispatch(
              //@ts-ignore redux thunk dont work with ts properly
              deleteTask(task._id)
            )
          }
          className={S.deleteTaskButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
