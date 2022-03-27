import { UserModel } from "./user.model";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypegooseModule } from "nestjs-typegoose";

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
