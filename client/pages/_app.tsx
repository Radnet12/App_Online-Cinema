import type { AppProps } from "next/app";

import { Providers } from "@/common";

import "@/assets/styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => (
  <Providers>
    <Component {...pageProps} />
  </Providers>
);

export default App;
