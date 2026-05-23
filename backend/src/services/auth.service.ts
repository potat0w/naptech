import type { UserRole } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { logAudit } from "../utils/activity.js";
import { conflict, notFound, unauthorized } from "../utils/errors.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import {
  generateRefreshToken,
  generateSecureToken,
  hashToken,
  signAccessToken,
} from "../utils/tokens.js";
import { serializeUserMe } from "../serializers/user.js";
import { sendPasswordResetEmail, sendPasswordResetOtpEmail } from "../utils/email.js";
import { emailConfigured, env } from "../config/env.js";

const REFRESH_MS = 7 * 24 * 60 * 60 * 1000;

function refreshExpiry() {
  return new Date(Date.now() + REFRESH_MS);
}

async function issueTokens(user: { id: string; role: UserRole; email: string }) {
  const accessToken = signAccessToken({
    sub: user.id,
    role: user.role,
    email: user.email,
  });

  const refreshToken = generateRefreshToken();
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: refreshExpiry(),
    },
  });

  return { accessToken, refreshToken };
}

export async function registerClient(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}) {
  const email = data.email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw conflict("An account with this email already exists.");

  const passwordHash = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      role: "client",
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email,
      phone: data.phone.trim(),
      credential: { create: { passwordHash } },
    },
    include: { address: true },
  });

  const tokens = await issueTokens(user);
  return {
    user: serializeUserMe(user),
    ...tokens,
  };
}

export async function login(
  email: string,
  password: string,
  meta?: { ip?: string; userAgent?: string }
) {
  const normalized = email.trim().toLowerCase();
  const user = await prisma.user.findFirst({
    where: { email: normalized, deletedAt: null, isActive: true },
    include: { credential: true, address: true },
  });

  if (!user?.credential) throw unauthorized("Invalid email or password.");

  const valid = await verifyPassword(password, user.credential.passwordHash);
  if (!valid) throw unauthorized("Invalid email or password.");

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  await logAudit({
    userId: user.id,
    action: "login",
    resource: "user",
    resourceId: user.id,
    ipAddress: meta?.ip ?? null,
    userAgent: meta?.userAgent ?? null,
  });

  const tokens = await issueTokens(user);
  return {
    user: serializeUserMe(user),
    ...tokens,
  };
}

export async function refreshSession(refreshToken: string) {
  const record = await prisma.refreshToken.findFirst({
    where: {
      tokenHash: hashToken(refreshToken),
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    include: { user: { include: { address: true } } },
  });

  if (!record?.user || record.user.deletedAt) {
    throw unauthorized("Invalid refresh token.");
  }

  await prisma.refreshToken.update({
    where: { id: record.id },
    data: { revokedAt: new Date() },
  });

  const tokens = await issueTokens(record.user);
  return {
    user: serializeUserMe(record.user),
    ...tokens,
  };
}

export async function logout(refreshToken: string | undefined) {
  if (!refreshToken) return;
  await prisma.refreshToken.updateMany({
    where: { tokenHash: hashToken(refreshToken), revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function getMe(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId, deletedAt: null },
    include: { address: true },
  });
  if (!user) throw notFound("User not found.");
  return serializeUserMe(user);
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findFirst({
    where: { email: email.trim().toLowerCase(), deletedAt: null },
  });
  if (!user) return { ok: true };

  const token = generateSecureToken();
  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  if (emailConfigured()) {
    try {
      await sendPasswordResetEmail(user.email, token);
    } catch (err) {
      console.error("Failed to send password reset email:", err);
    }
  }

  return { ok: true, resetToken: process.env.NODE_ENV === "development" ? token : undefined };
}

function generateOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function requestClientPasswordResetOtp(email: string) {
  const normalized = email.trim().toLowerCase();
  const user = await prisma.user.findFirst({
    where: { email: normalized, role: "client", deletedAt: null, isActive: true },
  });

  if (!user) {
    return { ok: true, emailSent: true };
  }

  const code = generateOtpCode();

  await prisma.passwordResetOtp.updateMany({
    where: { userId: user.id, usedAt: null },
    data: { usedAt: new Date() },
  });

  await prisma.passwordResetOtp.create({
    data: {
      userId: user.id,
      codeHash: hashToken(code),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  let emailSent = false;
  if (emailConfigured()) {
    const result = await sendPasswordResetOtpEmail(user.email, code);
    emailSent = result.sent;
    if (!emailSent) {
      console.error(`Password reset OTP was not delivered to ${user.email}`);
    }
  } else {
    console.error("Password reset OTP not sent — configure BREVO_API_KEY or SMTP on Render");
  }

  return {
    ok: true,
    emailSent,
    otp: env.nodeEnv === "development" ? code : undefined,
  };
}

export async function resetClientPasswordWithOtp(
  email: string,
  code: string,
  password: string
) {
  const normalized = email.trim().toLowerCase();
  const user = await prisma.user.findFirst({
    where: { email: normalized, role: "client", deletedAt: null },
    include: { credential: true },
  });

  if (!user?.credential) {
    throw unauthorized("Invalid or expired code.");
  }

  const record = await prisma.passwordResetOtp.findFirst({
    where: {
      userId: user.id,
      codeHash: hashToken(code.trim()),
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    throw unauthorized("Invalid or expired code.");
  }

  const passwordHash = await hashPassword(password);

  await prisma.$transaction([
    prisma.authCredential.update({
      where: { userId: user.id },
      data: { passwordHash, passwordChangedAt: new Date() },
    }),
    prisma.passwordResetOtp.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
    prisma.passwordResetOtp.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    }),
  ]);

  return { ok: true };
}

export async function resetPassword(token: string, password: string) {
  const record = await prisma.passwordResetToken.findFirst({
    where: {
      tokenHash: hashToken(token),
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
  });
  if (!record) throw unauthorized("Invalid or expired reset token.");

  const passwordHash = await hashPassword(password);
  await prisma.$transaction([
    prisma.authCredential.update({
      where: { userId: record.userId },
      data: { passwordHash, passwordChangedAt: new Date() },
    }),
    prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return { ok: true };
}
