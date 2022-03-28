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
import { Auth } from "@decorators";

import { ActorsService } from "./actors.service";
import { ActorDto } from "@dto";

@Controller("actors")
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Get()
  async getAllActors(@Query("searchTerm") searchTerm?: string) {
    return this.actorsService.getAllActors(searchTerm);
  }

  @Get("/slug/:slug")
  async getActorBySlug(@Param("slug") slug: string) {
    return this.actorsService.getActorBySlug(slug);
  }

  // ADMIN METHODS

  @Auth("admin")
  @Get("/:id")
  async getActorById(@Param("id", IdValidationPipe) id: string) {
    return this.actorsService.getActorById(id);
  }

  @Auth("admin")
  @HttpCode(200)
  @Post()
  async createActor() {
    return this.actorsService.createActor();
  }

  @Auth("admin")
  @Put("/:id")
  async updateActor(
    @Param("id", IdValidationPipe) id: string,
    @Body() dto: ActorDto,
  ) {
    return this.actorsService.updateActor(id, dto);
  }

  @Auth("admin")
  @Delete("/:id")
  async deleteActor(@Param("id", IdValidationPipe) id: string) {
    return this.actorsService.deleteActor(id);
  }
  // ADMIN METHODS
}
