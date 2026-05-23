import { ctaButton, detailRow, escapeHtml, wrapEmailHtml } from "./email-layout.js";

export type RecruitmentEmailData = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  position: string;
  experience: string;
  cvDriveUrl: string;
  availability?: string;
  message?: string;
};

const POSITION_LABELS: Record<string, string> = {
  part_time: "Part-time",
  full_time: "Full-time",
  live_in: "Live-in care",
};

const EXPERIENCE_LABELS: Record<string, string> = {
  new: "New to care",
  some: "Some experience",
  experienced: "Experienced",
};

function labelPosition(value: string) {
  return POSITION_LABELS[value] ?? value;
}

function labelExperience(value: string) {
  return EXPERIENCE_LABELS[value] ?? value;
}

function applicationCard(data: RecruitmentEmailData) {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const message = data.message?.trim();
  const availability = data.availability?.trim();
  const messageBlock = message
    ? `<p style="margin:16px 0 8px;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.04em;color:#6b6560;">Message</p>
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="padding:14px 16px;background-color:#f5f2f8;border-radius:10px;border:1px solid #ede9f3;">
              <p style="margin:0;font-size:14px;line-height:1.6;color:#404040;white-space:pre-wrap;">${escapeHtml(message)}</p>
            </td>
          </tr>
        </table>`
    : "";

  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:20px;border:1px solid #ede9f3;border-radius:12px;background-color:#faf8f4;overflow:hidden;">
    <tr>
      <td style="padding:16px 18px;background-color:#3f2d62;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.06em;color:rgba(255,255,255,0.75);">Applicant</p>
        <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#ffffff;">${escapeHtml(fullName)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:4px 18px 16px;background-color:#ffffff;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td class="detail-cell" style="padding:10px 0;border-bottom:1px solid #ede9f3;vertical-align:top;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.04em;color:#6b6560;">Email</p>
              <p style="margin:0;font-size:15px;line-height:1.45;">
                <a href="mailto:${escapeHtml(data.email)}" style="color:#644596;text-decoration:none;font-weight:bold;">${escapeHtml(data.email)}</a>
              </p>
            </td>
          </tr>
          ${detailRow("Phone", data.telephone)}
          ${detailRow("Position", labelPosition(data.position))}
          ${detailRow("Experience", labelExperience(data.experience))}
          ${availability ? detailRow("Availability", availability) : ""}
          <tr>
            <td class="detail-cell" style="padding:10px 0;vertical-align:top;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.04em;color:#6b6560;">CV</p>
              <p style="margin:0;font-size:15px;line-height:1.45;">
                <a href="${escapeHtml(data.cvDriveUrl)}" style="color:#644596;text-decoration:none;font-weight:bold;">View CV on Google Drive</a>
              </p>
            </td>
          </tr>
        </table>
        ${messageBlock}
      </td>
    </tr>
  </table>`;
}

export function buildRecruitmentApplicationEmailHtml(data: RecruitmentEmailData, adminUrl: string) {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const body = `
    <p style="margin:0 0 8px;font-size:16px;line-height:1.6;color:#404040;">
      A new job application was submitted on the Naptec website.
    </p>
    <p style="margin:0;font-size:15px;line-height:1.6;color:#6b6560;">
      Review the applicant details below and follow up from the admin portal.
    </p>
    ${applicationCard(data)}
    ${ctaButton("Open admin portal", adminUrl)}`;

  return wrapEmailHtml({
    title: `New job application — ${fullName}`,
    preheader: `New job application from ${fullName}`,
    headerBg: "#3f2d62",
    headline: "New job application",
    body,
  });
}

export function buildRecruitmentApplicationEmailText(data: RecruitmentEmailData) {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  return `A new job application was submitted on the Naptec website.

Applicant: ${fullName}
Email: ${data.email}
Phone: ${data.telephone}
Position: ${labelPosition(data.position)}
Experience: ${labelExperience(data.experience)}
${data.availability?.trim() ? `Availability: ${data.availability.trim()}` : ""}
CV: ${data.cvDriveUrl}
${data.message?.trim() ? `\nMessage:\n${data.message.trim()}` : ""}

Review and follow up in the admin portal.`;
}
