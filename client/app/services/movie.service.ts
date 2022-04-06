import { IMovie } from "@/types";



import { $axios } from "./axios.instance";


export class MovieService {
  static async getAllMovies(searchTerm?: string) {
    const { data: movies } = await $axios.get<IMovie[]>("/movies", {
      params: searchTerm ? { searchTerm } : {},
    });

    return movies;
  }

  static async getPopularMovies() {
    return $axios.get<IMovie[]>("/movies/popular");
  }
}