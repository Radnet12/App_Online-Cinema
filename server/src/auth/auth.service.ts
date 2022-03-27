import { RefreshTokenDto } from "./dto/refreshToken.dto";
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
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const oldUser = await this.userModel.findOne({ email: dto.email });

    if (oldUser) {
      throw new BadRequestException(
        "User with this email is already in this system",
      );
    }

    const salt = await genSalt(10);

    const newUser = new this.userModel({
      email: dto.email,
      password: await hash(dto.password, salt),
    });

    const tokens = await this.issueTokenPair(String(newUser._id));

    await newUser.save();

    return {
      user: this.returnUserFields(newUser),
      ...tokens,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) {
      throw new UnauthorizedException("Please sing in!");
    }

    const payload = await this.jwtService.verifyAsync(refreshToken);

    if (!payload) {
      throw new UnauthorizedException("Invalid token or expired!");
    }

    const user = await this.userModel.findById(payload._id);

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async validateUser(dto: AuthDto) {
    const user = await this.userModel.findOne({ email: dto.email });

    if (!user) {
      throw new UnauthorizedException(`User with email ${dto.email} not found`);
    }

    const isValidPassword = await compare(dto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException("Invalid password");
    }

    return user;
  }

  async issueTokenPair(userId: string) {
    const data = { _id: userId };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: "15d",
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: "1h",
    });

    return {
      refreshToken,
      accessToken,
    };
  }

  returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  }
}
