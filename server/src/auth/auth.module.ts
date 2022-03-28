import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";

import { getJwtConfig } from "@configs";
import { UserModel } from "@models";
import { JwtStrategy } from "@strategies";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: UserModel, schemaOptions: { collection: "users" } },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class AuthModule {}
