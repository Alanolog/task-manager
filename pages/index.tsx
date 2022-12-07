import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { singleTask, store } from "../models";
import { registerAction } from "../redux";

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
            registerAction("alan1234", "alan12345452@gmail.com", "secret")
          )
        }
      >
        register
      </button>
    </div>
  );
}
