import { FC } from "react";

import { Layout } from "@/layout/Layout";

import { IHome } from "./Home.interface";

export const Home: FC<IHome> = () => {
  return (
    <Layout>
      <h1>Main page</h1>
    </Layout>
  );
};
