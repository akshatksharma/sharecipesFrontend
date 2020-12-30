import { Provider } from "next-auth/client";
import dynamic from "next/dynamic";

import Menu from "../components/menu";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
