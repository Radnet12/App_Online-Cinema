import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { AuthDto } from "./dto/auth.dto";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post("/register")
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post("/login")
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @HttpCode(200)
  @Post("/refresh")
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto);
  }
}
