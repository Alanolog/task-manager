import Head from "next/head";
import React from "react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Simple task manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
