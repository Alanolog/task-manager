import React from "react";
import { LoginForm, SignUpForm } from "../components";
import { useRouter } from "next/router";
import { useAppSelector } from "../redux/hooks";

export default function Home() {
  const router = useRouter();
  const requestToken = useAppSelector((store) => store.user.userData?.token);
  if (requestToken?.length > 1) {
    router.push("/app");
  }
  React.useEffect(() => {}, [requestToken]);

  return (
    <main className="authMain">
      <SignUpForm />
      <LoginForm />
    </main>
  );
}
