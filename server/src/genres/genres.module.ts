import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { GenreModel } from "@models";

import { MoviesModule } from "@/movies/movies.module";
import { GenreController } from "./genres.controller";
import { GenreService } from "./genres.service";

@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: GenreModel, schemaOptions: { collection: "genres" } },
    ]),
    MoviesModule,
  ],
})
export class GenreModule {}
