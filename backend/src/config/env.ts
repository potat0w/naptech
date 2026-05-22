import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: required("DATABASE_URL"),
  corsAllowAll: process.env.CORS_RESTRICT !== "true",
  corsOrigins: (process.env.CORS_ORIGIN ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value && value !== "*"),
  jwtAccessSecret: required("JWT_ACCESS_SECRET"),
  jwtRefreshSecret: required("JWT_REFRESH_SECRET"),
  jwtAccessExpires: process.env.JWT_ACCESS_EXPIRES ?? "15m",
  jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES ?? "7d",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY ?? "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
  aiProvider: process.env.AI_PROVIDER ?? "rules",
  geminiApiKey: process.env.GEMINI_API_KEY ?? "",
  geminiModel: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
  appUrl:
    process.env.APP_URL ??
    (process.env.CORS_ORIGIN ?? "http://localhost:3000").split(",")[0]?.trim() ??
    "http://localhost:3000",
  smtpHost: process.env.SMTP_HOST ?? "",
  smtpPort: Number(process.env.SMTP_PORT ?? 587),
  smtpUser: process.env.SMTP_USER ?? "",
  smtpPass: process.env.SMTP_PASS ?? "",
  mailFrom: process.env.MAIL_FROM ?? "kahonbintezaman@gmail.com",
  mailFromName: process.env.MAIL_FROM_NAME ?? "Naptec Care",
  adminEmail: process.env.ADMIN_EMAIL ?? "kahonbintezaman@gmail.com",
  brevoApiKey: process.env.BREVO_API_KEY ?? "",
  brevoOtpTemplateId: Number(process.env.BREVO_OTP_TEMPLATE_ID ?? 0),
};

export function geminiConfigured() {
  return Boolean(env.geminiApiKey.trim());
}

export function smtpConfigured() {
  return Boolean(env.smtpHost && env.smtpUser && env.smtpPass);
}

export function brevoOtpConfigured() {
  return Boolean(env.brevoApiKey.trim() && env.brevoOtpTemplateId > 0);
}

export function cloudinaryConfigured() {
  return Boolean(
    env.cloudinaryCloudName && env.cloudinaryApiKey && env.cloudinaryApiSecret
  );
}
