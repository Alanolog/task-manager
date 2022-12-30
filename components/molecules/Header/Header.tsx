import React from "react";
import S from "./Header.module.scss";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className={S.header}>
      {router.pathname !== "/" ? (
        <>
          <p> </p>
          <span>Task Manager</span>
          <a
            onClick={() => {
              window.localStorage.removeItem("token");
              document.location.reload();
            }}
          >
            logout
          </a>
        </>
      ) : (
        <>
          <p> </p>
          <span>Task Manager</span>
          <p> </p>
        </>
      )}
    </header>
  );
};
