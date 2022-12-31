import React from "react";
import { LoginForm, SignUpForm } from "../components";
import { useRouter } from "next/router";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export default function Home() {
  const router = useRouter();
  const dispatch: ThunkDispatch<any, never, AnyAction> = useDispatch();
  const requestToken = useAppSelector((store) => store.user.userData?.token);
  if (requestToken?.length > 1) {
    router.push("/app");
  }
  React.useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  React.useEffect(() => {}, [requestToken]);

  return (
    <main className="authMain">
      <SignUpForm />
      <LoginForm />
    </main>
  );
}
