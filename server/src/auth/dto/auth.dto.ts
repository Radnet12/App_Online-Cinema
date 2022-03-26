import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6, {
    message: "Password must be not less that 6 symbols",
  })
  readonly password: string;
}
