import nodemailer from "nodemailer";
import { appUrls, joinAppUrl } from "../config/app-urls.js";
import {
  brevoApiKeyConfigured,
  brevoOtpConfigured,
  env,
  smtpConfigured,
} from "../config/env.js";
import { sendBrevoHtmlEmail, sendBrevoTemplateEmail } from "./brevo.js";
import {
  buildNewAssignmentEmailHtml,
  buildRemovedAssignmentEmailHtml,
} from "./assignment-email-html.js";
import { buildInquiryNotificationEmailHtml } from "./inquiry-email-html.js";
import { buildPasswordResetOtpHtml } from "./otp-email-html.js";

export type AssignmentEmailDetails = {
  caregiverName: string;
  clientName: string;
  address: string;
  date: string;
  shiftStart: string;
  shiftEnd: string;
  tasks: string[];
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!smtpConfigured()) {
    throw new Error("SMTP is not configured.");
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpPort === 465,
      requireTLS: env.smtpPort === 587,
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 20_000,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
      },
    });
  }
  return transporter;
}

async function sendViaSmtp(to: string, subject: string, html: string, text?: string) {
  const transport = getTransporter();
  await transport.sendMail({
    from: `"${env.mailFromName}" <${env.mailFrom}>`,
    to,
    subject,
    html,
    text,
  });
}

async function deliverHtmlEmail(to: string, subject: string, html: string, text?: string) {
  const failures: string[] = [];

  if (smtpConfigured()) {
    try {
      await sendViaSmtp(to, subject, html, text);
      console.log(`Email sent via SMTP → ${to} (${subject})`);
      return { sent: true as const, channel: "smtp" as const };
    } catch (err) {
      failures.push(`SMTP: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (brevoApiKeyConfigured()) {
    try {
      await sendBrevoHtmlEmail({ to, subject, html, text });
      console.log(`Email sent via Brevo API → ${to} (${subject})`);
      return { sent: true as const, channel: "brevo" as const };
    } catch (err) {
      failures.push(`Brevo: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.error(`Email not sent → ${to} (${subject}):`, failures.join(" | "));
  return { sent: false as const, channel: "none" as const };
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const html = options.html ?? options.text.replace(/\n/g, "<br>");
  return deliverHtmlEmail(options.to, options.subject, html, options.text);
}

export async function sendPasswordResetOtpEmail(to: string, code: string) {
  const subject = "Your Naptec password reset code";
  const html = buildPasswordResetOtpHtml(code);
  const param = env.brevoOtpParam;

  if (brevoOtpConfigured()) {
    try {
      await sendBrevoTemplateEmail({
        templateId: env.brevoOtpTemplateId,
        to,
        params: { [param]: code, otp: code },
      });
      console.log(`OTP email sent via Brevo template ${env.brevoOtpTemplateId} → ${to}`);
      return { sent: true as const, channel: "brevo-template" as const };
    } catch (err) {
      console.error(
        `Brevo template OTP failed (check template id ${env.brevoOtpTemplateId} and param "${param}"):`,
        err instanceof Error ? err.message : err
      );
    }
  }

  return deliverHtmlEmail(to, subject, html, `Your Naptec password reset code is: ${code}`);
}

export async function sendCaregiverNewAssignmentEmail(
  to: string,
  details: AssignmentEmailDetails
) {
  const subject = `New home visit assigned — ${details.clientName}`;
  const portalUrl = joinAppUrl(appUrls.caregiver(), "/tasks");
  const html = buildNewAssignmentEmailHtml(details, portalUrl);
  return deliverHtmlEmail(to, subject, html);
}

export async function sendCaregiverRemovedFromAssignmentEmail(
  to: string,
  details: AssignmentEmailDetails
) {
  const subject = `Visit reassigned — ${details.clientName}`;
  const html = buildRemovedAssignmentEmailHtml(details);
  return deliverHtmlEmail(to, subject, html);
}

export async function sendPasswordResetEmail(to: string, resetToken: string) {
  const resetUrl = `${joinAppUrl(appUrls.web(), "/reset-password")}?token=${encodeURIComponent(resetToken)}`;
  const subject = "Reset your Naptec password";
  const text = `You requested a password reset for your Naptec account.

Use this link to set a new password (valid for 1 hour):
${resetUrl}

If you did not request this, you can ignore this email.`;

  const html = `
<p>You requested a password reset for your Naptec account.</p>
<p><a href="${resetUrl}">Reset your password</a></p>
<p>This link is valid for 1 hour.</p>
<p>If you did not request this, you can ignore this email.</p>`;

  return deliverHtmlEmail(to, subject, html, text);
}

export async function sendInquiryNotificationEmail(data: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const subject = `New enquiry: ${data.subject}`;
  const html = buildInquiryNotificationEmailHtml(
    data,
    joinAppUrl(appUrls.admin(), "/inquiries")
  );
  return deliverHtmlEmail(env.adminEmail, subject, html);
}

export async function sendBookingNotificationEmail(data: {
  clientName: string;
  email: string;
  phone: string;
  address: string;
  careNotes?: string;
}) {
  const subject = `New care booking request — ${data.clientName}`;
  const text = `A client submitted a new care booking request.

Client: ${data.clientName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}
${data.careNotes ? `\nCare notes:\n${data.careNotes}` : ""}

Review and assign a caregiver in the admin portal.`;

  return deliverHtmlEmail(env.adminEmail, subject, text.replace(/\n/g, "<br>"), text);
}
