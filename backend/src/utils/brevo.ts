import { env } from "../config/env.js";

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";

export async function sendBrevoTemplateEmail(options: {
  templateId: number;
  to: string;
  params: Record<string, string>;
}) {
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
    body: JSON.stringify({
      templateId: options.templateId,
      sender: {
        name: env.mailFromName,
        email: env.mailFrom,
      },
      to: [{ email: options.to }],
      params: options.params,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo API error (${response.status}): ${body}`);
  }

  return { sent: true as const };
}
