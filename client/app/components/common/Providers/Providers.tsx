import { FC } from "react";

import Head from "next/head";

import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { AppLayout } from "@/layout";

import { store } from "@/store/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers: FC = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#181b1e" />
        <meta name="theme-color" content="#181b1e" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="#181b1e"
        />
      </Head>
      <NextNProgress
        color="#e30b13"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppLayout>{children}</AppLayout>
          <ToastContainer
            closeOnClick={false}
            autoClose={4000}
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            draggable={false}
            limit={3}
          />
        </QueryClientProvider>
      </Provider>
    </>
  );
};
