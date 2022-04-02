import { IActor } from "./actor.interface";
import { IGenre } from "./genre.interface";

export interface IMovieParams {
  year: number;
  duration: number;
  country: string;
}

export interface IMovie {
  _id: string;
  poster: string;
  largePoster: string;
  title: string;
  slug: string;
  params: IMovieParams;
  videoUrl: string;
  genres: IGenre[];
  actors: IActor[];
  watchCount: number;
  rating: number;
  isPublishedInTelegram: boolean;
}
