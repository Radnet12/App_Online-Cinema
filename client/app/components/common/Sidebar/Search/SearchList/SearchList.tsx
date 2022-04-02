import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { IMovie } from "@/types/movie.interface";

import styles from "./SearchList.module.scss";

export const SearchList: FC<{ movies: IMovie[] }> = (props) => {
  // **Props
  const { movies } = props;

  return (
    <div className={styles.list}>
      {movies.length ? (
        movies.map((movie) => (
          <Link href={`/movie/${movie.slug}`}>
            <a>
              <Image
                src={movie.poster}
                width={50}
                height={50}
                alt={movie.title}
                objectFit="cover"
                objectPosition="top"
                draggable={false}
              />
              <span>{movie.title}</span>
            </a>
          </Link>
        ))
      ) : (
        <div className="text-white text-center my-4">Movies not found!</div>
      )}
    </div>
  );
};
