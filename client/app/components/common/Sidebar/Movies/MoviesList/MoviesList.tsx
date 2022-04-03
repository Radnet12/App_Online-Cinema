import { FC } from "react";

import Link from "next/link";

import { MovieItem } from "../MovieItem/MovieItem";

import { IMoviesList } from "./MoviesList.interface";

import styles from "./MoviesList.module.scss";

export const MoviesList: FC<IMoviesList> = (props) => {
  // **Props
  const { link, title, movies } = props;


  return (
    <div className={styles.list}>
      <div className={styles.heading}>{title}</div>
      {movies.map((movie) => (
        <MovieItem key={movie._id} movie={movie} />
      ))}
      <Link href={link}>
        <a className={styles.more}>See more</a>
      </Link>
    </div>
  );
};
