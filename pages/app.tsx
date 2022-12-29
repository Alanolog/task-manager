import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { AddTask, SingleTask } from "../components";
import { fetchTasks } from "../redux";
import { singleTask, store } from "../models";

const mapStateToProps = (store: store) => ({
  requestToken: store.user.userData?.token,
  requestUsername: store.user.userData?.user?.username,
  tasks: store.tasks.tasks,
  singleTask: store.tasks.singleTask,
});

const mapDispatchToProps = () => {
  const dispatch = useAppDispatch();
  return {
    fetchTasks: () =>
      dispatch(
        //@ts-ignore redux thunk dont work with ts properly
        fetchTasks()
      ),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {}

const TaskManger = ({
  requestToken,
  requestUsername,
  tasks,
  fetchTasks,
  singleTask,
}: Props) => {
  const router = useRouter();

  React.useEffect(() => {
    if (requestToken?.length < 1 || !requestToken) {
      router.push("/");
    }
  }, [requestToken]);
  React.useEffect(() => {
    fetchTasks();
  }, [singleTask]);
  React.useEffect(() => {}, [tasks]);

  return (
    <main className="taskManager">
      {requestUsername ? (
        <h2>Welcome back, {requestUsername}</h2>
      ) : (
        <h2>Welcome back</h2>
      )}
      <AddTask />
      <div className="tasksList">
        {tasks.map((el: singleTask, id: number) => {
          return <SingleTask task={el} key={id} />;
        })}
      </div>
    </main>
  );
};
export default connector(TaskManger);
