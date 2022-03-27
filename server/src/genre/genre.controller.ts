import { IdValidationPipe } from "./../pipes/id.validation.pipe";
import { Auth } from "src/auth/decorators/auth.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { GenreService } from "./genre.service";
import { CreateGenreDto } from "./dto/createGenre.dto";

@Controller("genres")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async getAllGenres() {
    return this.genreService.getAllGenres();
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
  @HttpCode(200)
  @Get("/:id")
  async getGenreById(@Param("id", IdValidationPipe) id: string) {
    return this.genreService.getGenrebySlug(id);
  }

  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  @Put("/:id")
  async updateGenre(
    @Param("id", IdValidationPipe) id: string,
    dto: CreateGenreDto,
  ) {
    return this.genreService.updateGenre(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  @Put("/:id")
  async deleteGenre(@Param("id", IdValidationPipe) id: string) {
    return this.genreService.deleteGenre(id);
  }

  // ADMIN METHODS
}
