import { FC } from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import { AppLayout } from "@/layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>{children}</AppLayout>
    </QueryClientProvider>
  );
};
