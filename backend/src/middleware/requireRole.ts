import type { UserRole } from "@prisma/client";
import type { NextFunction, Response } from "express";
import { forbidden } from "../utils/errors.js";
import type { AuthRequest } from "./authenticate.js";

export function requireRole(...roles: UserRole[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) return next(forbidden());
    if (!roles.includes(req.user.role as UserRole)) {
      return next(forbidden("You do not have access to this resource."));
    }
    return next();
  };
}
