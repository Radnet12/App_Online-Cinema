import { IGenre } from "@/types";



import { $axios } from "./axios.instance";


export class GenreService {
  static async getAllGenres(searchTerm?: string) {
    return $axios.get<IGenre[]>("/genres", {
      params: searchTerm ? { searchTerm } : {},
    });
  }
}