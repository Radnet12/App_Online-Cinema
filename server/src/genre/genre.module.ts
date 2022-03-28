import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { GenreModel } from "./genre.model";
import { GenreController } from "./genre.controller";
import { GenreService } from "./genre.service";

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
