import { FC } from "react";

import * as MaterialIcons from "react-icons/md";

import { IconType } from "@/types";

export const Icon: FC<{ icon: IconType }> = (props) => {
  // **Props
  const { icon } = props;

  const IconComponent = MaterialIcons[icon] || MaterialIcons.MdDragIndicator;

  return <IconComponent />;
};
