import { UserModel } from "./../user/user.model";
import { Injectable } from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}

  async register(dto) {
    const newUser = new this.UserModel(dto);
    return newUser.save();
  }
}
