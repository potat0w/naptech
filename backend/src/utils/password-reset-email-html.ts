import { ctaButton, wrapEmailHtml } from "./email-layout.js";

export function buildPasswordResetEmailHtml(resetUrl: string) {
  const body = `
    <p style="margin:0 0 8px;font-size:16px;line-height:1.6;color:#404040;text-align:center;">
      You requested a password reset for your Naptec account.
    </p>
    <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#6b6560;text-align:center;">
      Use the button below to set a new password. This link is valid for <strong style="color:#3f2d62;">1 hour</strong>.
    </p>
  ${ctaButton("Reset your password", resetUrl)}
    <p style="margin:28px 0 0;font-size:13px;line-height:1.5;color:#6b6560;text-align:center;">
      If you did not request this, you can safely ignore this email. Your password will not change.
    </p>`;

  return wrapEmailHtml({
    title: "Reset your Naptec password",
    preheader: "Reset your Naptec password — link valid for 1 hour.",
    headerBg: "#3f2d62",
    headline: "Reset your password",
    body,
  });
}

export function buildPasswordResetEmailText(resetUrl: string) {
  return `You requested a password reset for your Naptec account.

Use this link to set a new password (valid for 1 hour):
${resetUrl}

If you did not request this, you can ignore this email.`;
}
