import React from "react";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { AddTask, SingleTask } from "../components";
import { fetchSingleTask } from "../redux";

export default function TaskManger() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const requestToken = useAppSelector((store) => store.user.userData?.token);
  const requestUsername = useAppSelector(
    (store) => store.user.userData?.user?.username
  );

  React.useEffect(() => {
    if (requestToken?.length < 1 || !requestToken) {
      router.push("/");
    }
  }, [requestToken]);

  return (
    <main className="taskManager">
      {requestUsername ? (
        <h2>Welcome back, {requestUsername}</h2>
      ) : (
        <h2>Welcome back</h2>
      )}
      <AddTask />
      <div>
        <SingleTask
          task={{
            name: "nazwa",
            description:
              "bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis bardzo długi opis ",
            isDone: false,
            createdBy: "639ddea28ff07f3cd6965686",
            _id: "63a4559b40a61c47dd010613",
            createdAt: "2022-12-22T13:03:23.915Z",
            updatedAt: "2022-12-22T13:03:23.915Z",
          }}
        />
      </div>
    </main>
  );
}
