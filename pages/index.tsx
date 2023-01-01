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
  const [loadingInfo, setLoadingInfo] = React.useState<null | String>(null);
  if (requestToken?.length > 1) {
    router.push("/app");
  }
  React.useEffect(() => {
    dispatch(fetchTasks());
    setLoadingInfo(window?.localStorage?.getItem("loadingInfo"));
  }, []);
  React.useEffect(() => {}, [requestToken, loadingInfo]);

  return (
    <main className="authMain">
      {loadingInfo !== "confirmed" && (
        <div
          style={{
            position: "fixed",
            maxWidth: "250px",
            border: "1px solid black",
            background: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          this may take some time to get up the server. when loading will be
          done you can register/login :){" "}
          <p
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translate(-50%,-80%)",
            }}
            onClick={() => {
              window.localStorage.setItem("loadingInfo", "confirmed");
              setLoadingInfo("confirmed");
            }}
          >
            X
          </p>
        </div>
      )}
      <SignUpForm />
      <LoginForm />
    </main>
  );
}
