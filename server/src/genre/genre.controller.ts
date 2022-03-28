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

import { IdValidationPipe } from "@Pipes/id.validation.pipe";
import { GenreDto } from "@Dto/genre.dto";
import { Auth } from "@Decorators/auth.decorator";

import { GenreService } from "./genre.service";

@Controller("genres")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async getAllGenres(@Query("searchTerm") searchTerm?: string) {
    return this.genreService.getAllGenres(searchTerm);
  }

  @Get("/slug/:slug")
  async getGenreBySlug(@Param("slug") slug: string) {
    return this.genreService.getGenrebySlug(slug);
  }

  @Get("/collections")
  async getCollections() {
    return this.genreService.getCollections();
  }

  // ADMIN METHODS

  @Auth("admin")
  @Get("/:id")
  async getGenreById(@Param("id", IdValidationPipe) id: string) {
    return this.genreService.getGenrebySlug(id);
  }

  @Auth("admin")
  @HttpCode(200)
  @Post()
  async createGenre() {
    return this.genreService.createGenre();
  }

  @Auth("admin")
  @Put("/:id")
  async updateGenre(
    @Param("id", IdValidationPipe) id: string,
    @Body() dto: GenreDto,
  ) {
    return this.genreService.updateGenre(id, dto);
  }

  @Auth("admin")
  @Delete("/:id")
  async deleteGenre(@Param("id", IdValidationPipe) id: string) {
    return this.genreService.deleteGenre(id);
  }

  // ADMIN METHODS
}
