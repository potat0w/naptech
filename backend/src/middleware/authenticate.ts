import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db/prisma.js";
import { unauthorized } from "../utils/errors.js";
import { verifyAccessToken } from "../utils/tokens.js";

export type AuthRequest = Request & {
  user?: {
    id: string;
    role: string;
    email: string;
  };
};

export async function authenticate(req: AuthRequest, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(unauthorized());
  }

  const token = header.slice(7);
  try {
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findFirst({
      where: { id: payload.sub, deletedAt: null, isActive: true },
      select: { id: true, role: true, email: true },
    });

    if (!user) return next(unauthorized());
    req.user = { id: user.id, role: user.role, email: user.email };
    return next();
  } catch {
    return next(unauthorized("Invalid or expired token."));
  }
}

export function optionalAuthenticate(req: AuthRequest, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return next();

  const token = header.slice(7);
  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, role: payload.role, email: payload.email };
  } catch {
    /* ignore */
  }
  return next();
}
