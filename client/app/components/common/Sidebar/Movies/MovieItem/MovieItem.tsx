import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/ui";

import { IMovie } from "@/types";

import styles from "../MoviesList/MoviesList.module.scss";

export const MovieItem: FC<{ movie: IMovie }> = (props) => {
  // **Props
  const { movie } = props;

  return (
    <div className={styles.item}>
      <Link href={`/movie/${movie.slug}`}>
        <a>
          <Image
            src={movie.poster}
            width={65}
            height={97}
            alt={movie.title}
            draggable={false}
            priority
          />
        </a>
      </Link>
      <div className={styles.info}>
        <Link href={`/movie/${movie.slug}`}>
          <a className={styles.title}>{movie.title}</a>
        </Link>
        <div className={styles.genres}>
          {movie.genres.map((genre, index, array) =>
            index + 1 === array.length ? (
              <Link key={genre._id} href={`/genre/${genre.slug}`}>
                <a>{genre.name}</a>
              </Link>
            ) : (
              <Link key={genre._id} href={`/genre/${genre.slug}`}>
                <a>{genre.name}, </a>
              </Link>
            )
          )}
        </div>
        <div className={styles.rating}>
          <Icon icon="MdStarRate" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};
