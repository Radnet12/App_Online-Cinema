import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";

import { getMongoDbConfig } from "@configs";

import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/users.module";
import { GenreModule } from "./genres/genres.module";
import { FilesModule } from "./files/files.module";
import { ActorsModule } from "./actors/actors.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig,
    }),
    AuthModule,
    UserModule,
    GenreModule,
    FilesModule,
    ActorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
