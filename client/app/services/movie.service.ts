import { IMovie } from "@/types";

import { $api } from "./axios.instance";

export class MovieService {
  static async getAllMovies(searchTerm?: string) {
    return $api.get<IMovie[]>("/movies", {
      params: searchTerm ? { searchTerm } : {},
    });
  }

  static async getPopularMovies() {
    return $api.get<IMovie[]>("/movies/popular");
  }
}
