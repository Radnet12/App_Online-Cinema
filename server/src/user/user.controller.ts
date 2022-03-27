import { UserService } from "./user.service";
import { Controller, Get } from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/profile")
  async getProfile() {
    return this.userService.byId();
  }
}
