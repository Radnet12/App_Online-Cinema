import { GenreType } from "@/types";

import { $api } from "./axios.instance";

export class GenreService {
  static async getAllGenres(searchTerm?: string) {
    return $api.get<GenreType[]>("/genres", {
      params: searchTerm ? { searchTerm } : {},
    });
  }
}
