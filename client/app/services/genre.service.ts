import { IGenre } from "@/types";

import { $api } from "./axios.instance";

export class GenreService {
  static async getAllGenres(searchTerm?: string) {
    return $api.get<IGenre[]>("/genres", {
      params: searchTerm ? { searchTerm } : {},
    });
  }
}
