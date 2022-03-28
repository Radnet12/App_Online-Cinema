import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { UserModel } from "@Models/user.model";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

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
