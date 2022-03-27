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

  @Get("/profile")
  @Auth()
  async getUserProfile(@User("_id") _id: string) {
    return this.userService.byId(_id);
  }

  @Put("/profile")
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  async updateUserProfile(
    @User("_id") _id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(_id, dto);
  }

  @Get("/count")
  @Auth("admin")
  async getUsersCount() {
    return this.userService.getUsersCount();
  }

  @Get()
  @Auth("admin")
  async getAllUsers(@Query("searchTerm") searchTerm?: string) {
    return this.userService.getAllUsers(searchTerm);
  }

  @Get("/:id")
  @Auth("admin")
  async getUserById(@Param("id", IdValidationPipe) id: string) {
    return this.userService.byId(id);
  }

  @Put("/:id")
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth("admin")
  async updateUserById(
    @Param("id", IdValidationPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(id, dto);
  }

  @Delete("/:id")
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth("admin")
  async deleteUserById(@Param("id", IdValidationPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
