import React from "react";
import S from "./SingleTask.module.scss";
import { singleTask } from "../../../models";
import { deleteTask } from "../../../redux";
import { UpdateTaskButton } from "../../index";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect, ConnectedProps } from "react-redux";

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, AnyAction>) => {
  return {
    deleteTask: (_id: String) => dispatch(deleteTask(_id)),
  };
};
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps extends PropsFromRedux {
  task: singleTask;
}

const SingleTask: React.FC<IProps> = ({ task, deleteTask }) => {
  return (
    <div className={`${S.task} ${task.isDone ? S.doneTask : ""}`}>
      <h5>{task.name}</h5>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <UpdateTaskButton taskID={task._id} taskData={task} />
        <button
          onClick={() => deleteTask(task._id)}
          className={S.deleteTaskButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default connector(SingleTask);
