import Head from "next/head";
import { Provider } from "react-redux";

import "../src/scss/main.scss";
import { store } from "../src/redux/redux";
import { resize } from "../src//functions/handlerSize";

import App from "../src/views/App.jsx";

if (process.browser) {
  resize();
  window.addEventListener("resize", () => {
    resize();
  });
}

function _App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>AppsStudio</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
        </Head>
        <App>
          <Component {...pageProps} />
        </App>
      </Provider>
    </>
  );
}

export default _App;
