import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { ActorModel } from "@models";

import { ActorsService } from "./actors.service";
import { ActorsController } from "./actors.controller";

@Module({
  providers: [ActorsService],
  controllers: [ActorsController],
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: ActorModel, schemaOptions: { collection: "actors" } },
    ]),
  ],
})
export class ActorsModule {}
