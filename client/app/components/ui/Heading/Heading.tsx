import { FC } from "react";

import { IHeading } from "./Heading.interface";

export const Heading: FC<IHeading> = (props) => {
  const { title, classname } = props;

  return (
    <h1
      className={`text-white  text-opacity-80 font-semibold ${classname} ${
        classname?.includes("xl") ? "" : "text-3xl"
      } `}
    >
      {title}
    </h1>
  );
};
