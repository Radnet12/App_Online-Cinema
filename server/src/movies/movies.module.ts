import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { MovieModel } from "@models";

import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: MovieModel, schemaOptions: { collection: "movies" } },
    ]),
  ],
})
export class MoviesModule {}
