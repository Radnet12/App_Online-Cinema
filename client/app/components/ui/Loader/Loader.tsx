import { FC } from "react";

import cn from "classnames";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Loader: FC<SkeletonProps> = (props) => {
  // **Props
  const { className, ...rest } = props;

  return (
    <Skeleton
      baseColor="#1f2125"
      highlightColor="#292a2e"
      className={cn("rounded-lg", className)}
      {...rest}
    />
  );
};
