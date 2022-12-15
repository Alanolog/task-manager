import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../redux/store";
import { Header, Footer } from "../components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Simple task manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
