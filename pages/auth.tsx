import React from "react";
import { LoginForm, SignUpForm } from "../components";

export default function Home() {
  return (
    <div>
      <main className="authMain">
        <SignUpForm />
        <LoginForm />
      </main>
    </div>
  );
}
