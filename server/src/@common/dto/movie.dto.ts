import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class MovieDtoParams {
  @IsNumber()
  year: number;

  @IsNumber()
  duration: number;

  @IsString()
  country: string;
}

export class MovieDto {
  @IsString()
  poster: string;

  @IsString()
  largePoster: string;

  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => MovieDtoParams)
  params?: MovieDtoParams;

  @IsString()
  videoUrl: string;

  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsArray()
  @IsString({ each: true })
  actors: string[];

  @IsOptional()
  @IsBoolean()
  isPublishedInTelegram?: boolean;
}
