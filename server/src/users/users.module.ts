import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { UserModel } from "@models";

import { UserController } from "./users.controller";
import { UserService } from "./users.service";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: UserModel, schemaOptions: { collection: "users" } },
    ]),
  ],
})
export class UserModule {}
