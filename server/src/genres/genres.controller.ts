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

import { IdValidationPipe } from "@pipes";
import { GenreDto } from "@dto";
import { Auth } from "@decorators";

import { GenreService } from "./genres.service";

@Controller("genres")
export class GenreController {
  constructor(private readonly genresService: GenreService) {}

  @Get()
  async getAllGenres(@Query("searchTerm") searchTerm?: string) {
    return this.genresService.getAllGenres(searchTerm);
  }

  @Get("/slug/:slug")
  async getGenreBySlug(@Param("slug") slug: string) {
    return this.genresService.getGenreBySlug(slug);
  }

  @Get("/collections")
  async getCollections() {
    return this.genresService.getCollections();
  }

  // ADMIN METHODS

  @Auth("admin")
  @Get("/:id")
  async getGenreById(@Param("id", IdValidationPipe) id: string) {
    return this.genresService.getGenreById(id);
  }

  @Auth("admin")
  @HttpCode(200)
  @Post()
  async createGenre() {
    return this.genresService.createGenre();
  }

  @Auth("admin")
  @Put("/:id")
  async updateGenre(
    @Param("id", IdValidationPipe) id: string,
    @Body() dto: GenreDto,
  ) {
    return this.genresService.updateGenre(id, dto);
  }

  @Auth("admin")
  @Delete("/:id")
  async deleteGenre(@Param("id", IdValidationPipe) id: string) {
    return this.genresService.deleteGenre(id);
  }

  // ADMIN METHODS
}
