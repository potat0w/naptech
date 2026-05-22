import { brevoApiKeyConfigured, brevoOtpConfigured, env, smtpConfigured } from "./env.js";
import nodemailer from "nodemailer";

export function logEmailStatus() {
  const smtp = smtpConfigured();
  const brevoKey = brevoApiKeyConfigured();
  const brevoOtp = brevoOtpConfigured();

  console.log("Email configuration:");
  console.log(`  NODE_ENV: ${env.nodeEnv}`);
  console.log(`  SMTP: ${smtp ? `yes (${env.smtpHost}:${env.smtpPort}, user ${env.smtpUser})` : "no"}`);
  console.log(`  Brevo API key: ${brevoKey ? "yes" : "no"}`);
  console.log(
    `  Brevo OTP template: ${brevoOtp ? `yes (id ${env.brevoOtpTemplateId})` : "no — OTP uses SMTP HTML"}`
  );
  console.log(`  Sender MAIL_FROM (verify in Brevo): ${env.mailFrom}`);
  console.log(`  Admin notifications → ${env.adminEmail}`);
  console.log(`  Web app URL: ${env.webAppUrl}`);
  console.log(`  Admin app URL: ${env.adminAppUrl}`);
  console.log(`  Caregiver app URL: ${env.caregiverAppUrl}`);

  if (!smtp && !brevoKey) {
    console.error(
      "EMAIL DISABLED: Add SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_FROM to Render Environment."
    );
  }
}

export async function verifySmtpOnStartup() {
  if (!smtpConfigured()) {
    console.warn("SMTP verify skipped — SMTP_* env vars not set.");
    return;
  }

  try {
    const transport = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpPort === 465,
      requireTLS: env.smtpPort === 587,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
      },
    });
    await transport.verify();
    console.log("SMTP verify: connection to Brevo OK");
  } catch (err) {
    console.error(
      "SMTP verify FAILED — emails will not send. Check SMTP_USER/SMTP_PASS on Render:",
      err instanceof Error ? err.message : err
    );
  }
}
