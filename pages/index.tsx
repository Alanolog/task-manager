import React from "react";
import { LoginForm, SignUpForm } from "../components";
import { useRouter } from "next/router";
import { fetchTasks } from "../redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { store } from "../models";

const mapStateToProps = (store: store) => ({
  requestToken: store.user.userData?.token,
  isWaitingTasks: store.tasks.loading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, AnyAction>) => {
  return {
    fetchTasks: () => dispatch(fetchTasks()),
  };
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Home: React.FC<PropsFromRedux> = ({
  fetchTasks,
  requestToken,
  isWaitingTasks,
}) => {
  const router = useRouter();
  const [loadingInfo, setLoadingInfo] = React.useState<null | String>(null);
  if (requestToken?.length > 1) {
    router.push("/app");
  }
  React.useEffect(() => {
    fetchTasks();
    setLoadingInfo(window?.localStorage?.getItem("loadingInfo"));
  }, []);
  React.useEffect(() => {}, [requestToken, loadingInfo]);

  return (
    <main className="authMain">
      {loadingInfo !== "confirmed" ||
        (isWaitingTasks && (
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
        ))}
      <SignUpForm />
      <LoginForm />
    </main>
  );
};
export default connector(Home);
