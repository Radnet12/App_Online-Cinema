import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { hash, compare, genSalt } from "bcryptjs";

import { AuthDto } from "./dto/auth.dto";
import { UserModel } from "./../user/user.model";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}

  async register(dto: AuthDto) {
    const oldUser = await this.UserModel.findOne({ email: dto.email });

    if (oldUser) {
      throw new BadRequestException(
        "User with this email is already in this system",
      );
    }

    const salt = await genSalt(10);

    const newUser = new this.UserModel({
      email: dto.email,
      password: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async login(dto: AuthDto) {
    return this.validateUser(dto);
  }

  async validateUser(dto: AuthDto) {
    const user = await this.UserModel.findOne({ email: dto.email });

    if (!user) {
      throw new UnauthorizedException(`User with email ${dto.email} not found`);
    }

    const isValidPassword = await compare(dto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException("Invalid password");
    }

    return user;
  }
}
