import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { GenreModel } from "@models";

import { MoviesService } from "@/movies/movies.service";
import { GenreController } from "./genres.controller";
import { GenreService } from "./genres.service";

@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: GenreModel, schemaOptions: { collection: "genres" } },
    ]),
    MoviesService,
  ],
})
export class GenreModule {}
