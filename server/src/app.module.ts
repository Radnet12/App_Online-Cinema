import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";

import { getMongoDbConfig } from "@configs";

import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/users.module";
import { GenreModule } from "./genres/genres.module";
import { FilesModule } from "./files/files.module";
import { ActorsModule } from "./actors/actors.module";
import { MoviesModule } from "./movies/movies.module";
import { RatingModule } from "./rating/rating.module";
import { TelegramModule } from "./telegram/telegram.module";

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
    MoviesModule,
    RatingModule,
    TelegramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
