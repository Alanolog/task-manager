import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { singleTask, store } from "../models";
import {
  loginAction,
  createTask,
  fetchTasks,
  patchTask,
  deleteTask,
} from "../redux";

export default function Home() {
  const tasksArray: singleTask[] | undefined = useSelector(
    (state: store) => state.tasks.tasks
  );
  const dispatch = useDispatch();
  React.useEffect(() => {}, [tasksArray]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Simple task manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button
        onClick={() =>
          dispatch(
            //@ts-ignore TS have problems with thunks
            loginAction("alan12345452@gmail.com", "secret")
          )
        }
      >
        login
      </button>
      <button
        onClick={() =>
          dispatch(
            //@ts-ignore TS have problems with thunks
            createTask("Task v2", "Opis randomowego tasku")
          )
        }
      >
        createTask
      </button>
      <button
        onClick={() =>
          dispatch(
            //@ts-ignore TS have problems with thunks
            fetchTasks()
          )
        }
      >
        fetchAllTasks
      </button>
      <button
        onClick={() =>
          dispatch(
            //@ts-ignore TS have problems with thunks
            patchTask("63985904e398f5b25bacdfc8", "nazwa taska", "opis taska")
          )
        }
      >
        patch task
      </button>
      <button
        onClick={() =>
          dispatch(
            //@ts-ignore TS have problems with thunks
            deleteTask("6398681c0497e4608f376f52")
          )
        }
      >
        delete task
      </button>
    </div>
  );
}
