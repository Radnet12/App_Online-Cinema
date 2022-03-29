import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { Types } from "mongoose";

import { IdValidationPipe } from "@pipes";
import { MovieDto } from "@dto";
import { Auth } from "@decorators";

import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getAllMovies(@Query("searchTerm") searchTerm?: string) {
    return this.moviesService.getAllMovies(searchTerm);
  }

  @Get("/popular")
  async getMostPopularMovies() {
    return this.moviesService.getMostPopularMovies();
  }

  @Get("/slug/:slug")
  async getMovieBySlug(@Param("slug") slug: string) {
    return this.moviesService.getMovieBySlug(slug);
  }

  @Get("/actor/:actorId")
  async getMoviesByActor(
    @Param("actorId", IdValidationPipe) actorId: Types.ObjectId,
  ) {
    return this.moviesService.getMoviesByActor(actorId);
  }

  @HttpCode(200)
  @Post("/genres")
  async getMoviesByGenres(@Body("genreIds") genreIds: Types.ObjectId[]) {
    return this.moviesService.getMoviesByGenres(genreIds);
  }

  @Put("/watch")
  async updateWatchesCount(@Body("slug") slug: string) {
    return this.moviesService.updateWatchesCount(slug);
  }

  // ADMIN METHODS

  @Auth("admin")
  @Get("/:id")
  async getMovieById(@Param("id", IdValidationPipe) id: string) {
    return this.moviesService.getMovieById(id);
  }

  @Auth("admin")
  @HttpCode(200)
  @Post()
  async createMovie() {
    return this.moviesService.createMovie();
  }

  @Auth("admin")
  @Put("/:id")
  async updateMovie(
    @Param("id", IdValidationPipe) id: string,
    @Body() dto: MovieDto,
  ) {
    return this.moviesService.updateMovie(id, dto);
  }

  @Auth("admin")
  @Delete("/:id")
  async deleteMovie(@Param("id", IdValidationPipe) id: string) {
    return this.moviesService.deleteMovie(id);
  }

  // ADMIN METHODS
}
