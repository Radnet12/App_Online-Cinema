import { MovieService } from "@/services";

import { MoviesBlock } from "./MoviesBlock/MoviesBlock";

import styles from "./Movies.module.scss";

export const Movies = () => {
  return (
    <div>
      <MoviesBlock
        title="Popular movies"
        link="/trending"
        query={() => MovieService.getPopularMovies()}
      />
      {/* <MoviesBlock /> */}
    </div>
  );
};
