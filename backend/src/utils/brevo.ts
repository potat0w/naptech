import { env } from "../config/env.js";

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";

async function brevoRequest(body: Record<string, unknown>) {
  const apiKey = env.brevoApiKey.trim();
  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured.");
  }

  const response = await fetch(BREVO_SEND_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Brevo API ${response.status}: ${detail}`);
  }

  return { sent: true as const };
}

export async function sendBrevoTemplateEmail(options: {
  templateId: number;
  to: string;
  params: Record<string, string>;
}) {
  return brevoRequest({
    templateId: options.templateId,
    sender: {
      name: env.mailFromName,
      email: env.mailFrom,
    },
    to: [{ email: options.to }],
    params: options.params,
  });
}

export async function sendBrevoHtmlEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  return brevoRequest({
    sender: {
      name: env.mailFromName,
      email: env.mailFrom,
    },
    to: [{ email: options.to }],
    subject: options.subject,
    htmlContent: options.html,
    textContent: options.text,
  });
}
