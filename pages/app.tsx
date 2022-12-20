import React from "react";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { AddTask } from "../components";

export default function TaskManger() {
  const router = useRouter();

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
    </main>
  );
}
