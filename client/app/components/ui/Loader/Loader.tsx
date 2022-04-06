import { FC } from "react";

import clsx from "clsx";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Loader: FC<SkeletonProps> = (props) => {
  // **Props
  const { className, ...rest } = props;

  return (
    <Skeleton
      baseColor="#1f2125"
      highlightColor="#292a2e"
      className={clsx("rounded-lg", className)}
      {...rest}
    />
  );
};
