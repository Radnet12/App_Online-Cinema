import { applyDecorators, UseGuards } from "@nestjs/common";

import { OnlyAdminGuard, JwtAuthGuard } from "@guards";
import { TypeRole } from "@types";

export const Auth = (role: TypeRole = "user") =>
  applyDecorators(
    role === "admin"
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard),
  );
