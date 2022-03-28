import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from "@nestjs/common";

import { IdValidationPipe } from "@Pipes/id.validation.pipe";
import { UserDto } from "@Dto/user.dto";

import { Auth } from "@/auth/decorators/auth.decorator";

import { UserService } from "./user.service";
import { User } from "./decorators/user.decorator";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Put("/profile")
  async updateUserProfile(@User("_id") _id: string, @Body() dto: UserDto) {
    return this.userService.updateUserProfile(_id, dto);
  }

  @Auth()
  @Get("/profile")
  async getUserProfile(@User("_id") _id: string) {
    return this.userService.getUserbyId(_id);
  }

  // ADMIN METHODS

  @Auth("admin")
  @Get("/count")
  async getUsersCount() {
    return this.userService.getUsersCount();
  }

  @Auth("admin")
  @Get()
  async getAllUsers(@Query("searchTerm") searchTerm?: string) {
    return this.userService.getAllUsers(searchTerm);
  }

  @Auth("admin")
  @Get("/:id")
  async getUserById(@Param("id", IdValidationPipe) id: string) {
    return this.userService.getUserbyId(id);
  }

  @Auth("admin")
  @Put("/:id")
  async updateUserById(
    @Param("id", IdValidationPipe) id: string,
    @Body() dto: UserDto,
  ) {
    return this.userService.updateUserProfile(id, dto);
  }

  @Auth("admin")
  @Delete("/:id")
  async deleteUserById(@Param("id", IdValidationPipe) id: string) {
    return this.userService.deleteUser(id);
  }

  // ADMIN METHODS
}
