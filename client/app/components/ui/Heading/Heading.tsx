import { FC } from "react";

import { IHeading } from "./Heading.interface";

export const Heading: FC<IHeading> = (props) => {
  const { title, className } = props;

  return (
    <h1
      className={`text-white  text-opacity-80 font-semibold ${className} ${
        className?.includes("xl") ? "" : "text-3xl"
      } `}
    >
      {title}
    </h1>
  );
};
