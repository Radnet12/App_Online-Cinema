import { FC } from "react";

import { Heading, Meta } from "@/ui";

import { IHome } from "./Home.interface";

export const Home: FC<IHome> = () => {
  return (
    <Meta
      title="Watch movies online"
      description="Watch MovieApp movies and TV shows online or stream right to your browser"
    >
      <Heading
        title="Watch movies online"
        className="text-gray-300 mb-8 text-xl"
      >
        Main page
      </Heading>
    </Meta>
  );
};
