import { FC } from "react";

import { AppLayout } from "@/layout";

import { IHome } from "./Home.interface";

export const Home: FC<IHome> = () => {
  return (
    <AppLayout>
      <h1>Main page</h1>
    </AppLayout>
  );
};
