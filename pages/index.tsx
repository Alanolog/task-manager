import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { singleTask, store } from "../models";
import { loginAction, createTask } from "../redux";

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
    </div>
  );
}
