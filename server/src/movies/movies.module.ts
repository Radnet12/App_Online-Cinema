import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { MovieModel } from "@models";

import { TelegramModule } from "@/telegram/telegram.module";
import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: MovieModel, schemaOptions: { collection: "movies" } },
    ]),
    TelegramModule,
  ],
  exports: [MoviesService],
})
export class MoviesModule {}
