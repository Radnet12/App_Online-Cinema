import { applyDecorators, UseGuards } from "@nestjs/common";

import { OnlyAdminGuard, JwtAuthGuard } from "@guards";
import { TypeRole } from "@types";

const roles: Record<TypeRole, Function[]> = {
  admin: [JwtAuthGuard, OnlyAdminGuard],
  user: [JwtAuthGuard],
};

export const Auth = (role: TypeRole = "user") =>
  applyDecorators(UseGuards(...roles[role]));
