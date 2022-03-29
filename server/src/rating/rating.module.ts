import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { RatingModel } from "@models";
import { MoviesModule } from "@/movies/movies.module";
import { MoviesService } from "@/movies/movies.service";

import { RatingController } from "./rating.controller";
import { RatingService } from "./rating.service";

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: RatingModel, schemaOptions: { collection: "rating" } },
    ]),
    MoviesModule,
  ],
  exports: [MoviesService],
})
export class RatingModule {}
