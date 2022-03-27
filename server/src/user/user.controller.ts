import { IdValidationPipe } from "./../pipes/id.validation.pipe";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserService } from "./user.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { User } from "./decorators/user.decorator";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Put("/profile")
  async updateUserProfile(
    @User("_id") _id: string,
    @Body() dto: UpdateUserDto,
  ) {
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

  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  @Put("/:id")
  async updateUserById(
    @Param("id", IdValidationPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUserProfile(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Auth("admin")
  @HttpCode(200)
  @Delete("/:id")
  async deleteUserById(@Param("id", IdValidationPipe) id: string) {
    return this.userService.deleteUser(id);
  }

  // ADMIN METHODS
}
