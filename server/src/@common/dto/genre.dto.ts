import { IsString } from "class-validator";

export class GenreDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsString()
  icon: string;
}
