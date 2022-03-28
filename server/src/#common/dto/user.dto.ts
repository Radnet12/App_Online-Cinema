import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class UserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
