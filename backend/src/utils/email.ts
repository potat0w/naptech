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
  buildCancelledAssignmentEmailHtml,
  buildCancelledAssignmentEmailText,
  buildNewAssignmentEmailHtml,
  buildNewAssignmentEmailText,
  buildRemovedAssignmentEmailHtml,
  buildRemovedAssignmentEmailText,
} from "./assignment-email-html.js";
import {
  buildBookingNotificationEmailHtml,
  buildBookingNotificationEmailText,
} from "./booking-email-html.js";
import { buildInquiryNotificationEmailHtml, buildInquiryNotificationEmailText } from "./inquiry-email-html.js";
import { buildPasswordResetOtpHtml } from "./otp-email-html.js";
import { buildPasswordResetEmailHtml, buildPasswordResetEmailText } from "./password-reset-email-html.js";
import {
  buildRecruitmentApplicationEmailHtml,
  buildRecruitmentApplicationEmailText,
} from "./recruitment-email-html.js";

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

  if (brevoApiKeyConfigured()) {
    try {
      await sendBrevoHtmlEmail({ to, subject, html, text });
      console.log(`Email sent via Brevo API → ${to} (${subject})`);
      return { sent: true as const, channel: "brevo" as const };
    } catch (err) {
      failures.push(`Brevo: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (smtpConfigured()) {
    try {
      await sendViaSmtp(to, subject, html, text);
      console.log(`Email sent via SMTP → ${to} (${subject})`);
      return { sent: true as const, channel: "smtp" as const };
    } catch (err) {
      failures.push(`SMTP: ${err instanceof Error ? err.message : String(err)}`);
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
  const text = buildNewAssignmentEmailText(details, portalUrl);
  return deliverHtmlEmail(to, subject, html, text);
}

export async function sendCaregiverRemovedFromAssignmentEmail(
  to: string,
  details: AssignmentEmailDetails
) {
  const subject = `Visit reassigned — ${details.clientName}`;
  const html = buildRemovedAssignmentEmailHtml(details);
  const text = buildRemovedAssignmentEmailText(details);
  return deliverHtmlEmail(to, subject, html, text);
}

export async function sendCaregiverCancelledAssignmentEmail(
  to: string,
  details: AssignmentEmailDetails
) {
  const subject = `Visit cancelled — ${details.clientName}`;
  const html = buildCancelledAssignmentEmailHtml(details);
  const text = buildCancelledAssignmentEmailText(details);
  return deliverHtmlEmail(to, subject, html, text);
}

export async function sendPasswordResetEmail(to: string, resetToken: string) {
  const resetUrl = `${joinAppUrl(appUrls.web(), "/reset-password")}?token=${encodeURIComponent(resetToken)}`;
  const subject = "Reset your Naptec password";
  const html = buildPasswordResetEmailHtml(resetUrl);
  const text = buildPasswordResetEmailText(resetUrl);

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
  const adminUrl = joinAppUrl(appUrls.admin(), "/inquiries");
  const html = buildInquiryNotificationEmailHtml(data, adminUrl);
  const text = buildInquiryNotificationEmailText(data);
  return deliverHtmlEmail(env.adminEmail, subject, html, text);
}

export async function sendRecruitmentApplicationNotificationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  position: string;
  experience: string;
  cvDriveUrl: string;
  availability?: string;
  message?: string;
}) {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const subject = `New job application — ${fullName}`;
  const adminUrl = joinAppUrl(appUrls.admin(), "/dashboard");
  const html = buildRecruitmentApplicationEmailHtml(data, adminUrl);
  const text = buildRecruitmentApplicationEmailText(data);
  return deliverHtmlEmail(env.adminEmail, subject, html, text);
}

export async function sendBookingNotificationEmail(data: {
  clientName: string;
  email: string;
  phone: string;
  address: string;
  careNotes?: string;
}) {
  const subject = `New care booking request — ${data.clientName}`;
  const adminUrl = joinAppUrl(appUrls.admin(), "/bookings");
  const html = buildBookingNotificationEmailHtml(data, adminUrl);
  const text = buildBookingNotificationEmailText(data);

  return deliverHtmlEmail(env.adminEmail, subject, html, text);
}
