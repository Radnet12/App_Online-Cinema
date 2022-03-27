import { UserModel } from "./user.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}
  async byId(_id) {
    const user = await this.userModel.findById(_id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }
}
