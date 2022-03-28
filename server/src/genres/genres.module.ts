import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { GenreModel } from "@models";

import { GenreController } from "./genres.controller";
import { GenreService } from "./genres.service";

@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: GenreModel, schemaOptions: { collection: "genres" } },
    ]),
  ],
})
export class GenreModule {}
