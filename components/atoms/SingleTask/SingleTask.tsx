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
    <div className={S.task}>
      <h5>{task.name}</h5>
      <UpdateTaskButton taskID={task._id} taskData={task} />
    </div>
  );
};
