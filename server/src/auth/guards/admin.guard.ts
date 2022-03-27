import { UserModel } from "./../../user/user.model";
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";

export class OnlyAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: UserModel }>();
    const user = request.user;

    if (!user.isAdmin) {
      throw new ForbiddenException("You do not have rights!");
    }

    return user.isAdmin;
  }
}