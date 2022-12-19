import React from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../redux/hooks";

export default function TaskManger() {
  const router = useRouter();
  const requestToken = useAppSelector((store) => store.user.userData?.token);
  if (requestToken?.length === 0) {
    router.push("/");
  }

  React.useEffect(() => {}, [requestToken]);

  return <main className="taskManager"></main>;
}
