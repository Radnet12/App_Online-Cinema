import { JwtStrategy } from "./strategies/jwt.strategy";
import { getJwtConfig } from "./../config/jwt.config";
import { UserModel } from "./../user/user.model";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

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
