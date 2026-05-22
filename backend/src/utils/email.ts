import nodemailer from "nodemailer";
import { brevoOtpConfigured, env, smtpConfigured } from "../config/env.js";
import { sendBrevoTemplateEmail } from "./brevo.js";
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
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
      },
    });
  }
  return transporter;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  if (!smtpConfigured()) {
    console.warn("SMTP not configured — email not sent:", options.subject, "→", options.to);
    return { sent: false as const };
  }

  const transport = getTransporter();
  await transport.sendMail({
    from: `"${env.mailFromName}" <${env.mailFrom}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html ?? options.text.replace(/\n/g, "<br>"),
  });

  return { sent: true as const };
}

async function sendHtmlEmail(to: string, subject: string, html: string) {
  if (!smtpConfigured()) {
    console.warn("SMTP not configured — email not sent:", subject, "→", to);
    return { sent: false as const };
  }

  const transport = getTransporter();
  await transport.sendMail({
    from: `"${env.mailFromName}" <${env.mailFrom}>`,
    to,
    subject,
    html,
  });

  return { sent: true as const };
}

export async function sendPasswordResetOtpEmail(to: string, code: string) {
  if (brevoOtpConfigured()) {
    return sendBrevoTemplateEmail({
      templateId: env.brevoOtpTemplateId,
      to,
      params: { otp: code },
    });
  }

  if (!smtpConfigured()) {
    console.warn("OTP email not sent — set BREVO_API_KEY + BREVO_OTP_TEMPLATE_ID or SMTP");
    return { sent: false as const };
  }

  return sendHtmlEmail(to, "Your Naptec password reset code", buildPasswordResetOtpHtml(code));
}

export async function sendCaregiverNewAssignmentEmail(
  to: string,
  details: AssignmentEmailDetails
) {
  const subject = `New home visit assigned — ${details.clientName}`;
  const portalUrl = `${env.appUrl}/caregiver/tasks`;
  const html = buildNewAssignmentEmailHtml(details, portalUrl);

  return sendHtmlEmail(to, subject, html);
}

export async function sendCaregiverRemovedFromAssignmentEmail(
  to: string,
  details: AssignmentEmailDetails
) {
  const subject = `Visit reassigned — ${details.clientName}`;
  const html = buildRemovedAssignmentEmailHtml(details);

  return sendHtmlEmail(to, subject, html);
}

export async function sendPasswordResetEmail(to: string, resetToken: string) {
  const resetUrl = `${env.appUrl}/reset-password?token=${encodeURIComponent(resetToken)}`;
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

  return sendEmail({ to, subject, text, html });
}

export async function sendInquiryNotificationEmail(data: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const subject = `New enquiry: ${data.subject}`;
  const html = buildInquiryNotificationEmailHtml(data, `${env.appUrl}/admin/inquiries`);

  return sendHtmlEmail(env.adminEmail, subject, html);
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

  return sendEmail({
    to: env.adminEmail,
    subject,
    text,
  });
}
