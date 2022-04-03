import { FC } from "react";

import { useQuery } from "react-query";

import { Loader } from "@/ui";

import { MoviesList } from "../MoviesList/MoviesList";

import { IMoviesBlock } from "./MoviesBlock.interface";

export const MoviesBlock: FC<IMoviesBlock> = (props) => {
  // **Props
  const { query, link, title } = props;

  // Query
  const { isLoading, data } = useQuery(`movies-block-${title}`, query, {
    select: ({ data }) => data,
  });

  return isLoading ? (
    <div className="mt-11">
      <Loader count={3} className="h-28 mb-4" />
    </div>
  ) : (
    <MoviesList title={title} link={link} movies={data || []} />
  );
};
