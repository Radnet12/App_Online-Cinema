import { applyDecorators, UseGuards } from "@nestjs/common";

import { OnlyAdminGuard } from "@Guards/admin.guard";
import { JwtAuthGuard } from "@Guards/jwt.guard";
import { TypeRole } from "@Types/auth.type";

export const Auth = (role: TypeRole = "user") =>
  applyDecorators(
    role === "admin"
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard),
  );
