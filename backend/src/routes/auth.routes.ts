import { Router } from "express";
import * as authService from "../services/auth.service.js";
import { authLimiter } from "../middleware/rateLimit.js";
import { authenticate, type AuthRequest } from "../middleware/authenticate.js";
import { validateBody } from "../validation/validate.js";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "../validation/schemas.js";

const REFRESH_COOKIE = "naptec_refresh";

function setRefreshCookie(res: import("express").Response, token: string) {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/v1/auth",
  });
}

function clearRefreshCookie(res: import("express").Response) {
  res.clearCookie(REFRESH_COOKIE, { path: "/v1/auth" });
}

export const authRouter = Router();

authRouter.use(authLimiter);

authRouter.post("/register", async (req, res, next) => {
  try {
    const body = await validateBody(signupSchema, req.body);
    const result = await authService.registerClient(body);
    setRefreshCookie(res, result.refreshToken);
    res.status(201).json({
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (e) {
    next(e);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const body = await validateBody(loginSchema, req.body);
    const result = await authService.login(body.email, body.password, {
      ip: req.ip,
      userAgent: req.get("user-agent") ?? undefined,
    });
    setRefreshCookie(res, result.refreshToken);
    res.json({
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (e) {
    next(e);
  }
});

authRouter.post("/refresh", async (req, res, next) => {
  try {
    const token = req.cookies?.[REFRESH_COOKIE] as string | undefined;
    if (!token) {
      res.status(204).end();
      return;
    }
    const result = await authService.refreshSession(token);
    setRefreshCookie(res, result.refreshToken);
    res.json({
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (e) {
    next(e);
  }
});

authRouter.post("/logout", async (req, res, next) => {
  try {
    const token = req.cookies?.[REFRESH_COOKIE] as string | undefined;
    await authService.logout(token);
    clearRefreshCookie(res);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

authRouter.get("/me", authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = await authService.getMe(req.user!.id);
    res.json({ user });
  } catch (e) {
    next(e);
  }
});

authRouter.post("/forgot-password", async (req, res, next) => {
  try {
    const body = await validateBody(forgotPasswordSchema, req.body);
    const result = await authService.forgotPassword(body.email);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

authRouter.post("/reset-password", async (req, res, next) => {
  try {
    const body = await validateBody(resetPasswordSchema, req.body);
    const result = await authService.resetPassword(body.token, body.password);
    res.json(result);
  } catch (e) {
    next(e);
  }
});
