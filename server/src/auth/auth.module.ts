import { UserModel } from "./../user/user.model";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: UserModel, schemaOptions: { collection: "users" } },
    ]),
  ],
})
export class AuthModule {}
