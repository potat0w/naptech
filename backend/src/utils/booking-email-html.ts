import { ctaButton, detailRow, escapeHtml, wrapEmailHtml } from "./email-layout.js";

export type BookingEmailData = {
  clientName: string;
  email: string;
  phone: string;
  address: string;
  careNotes?: string;
};

function bookingCard(data: BookingEmailData) {
  const notes = data.careNotes?.trim();
  const notesBlock = notes
    ? `<p style="margin:16px 0 8px;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.04em;color:#6b6560;">Care notes</p>
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="padding:14px 16px;background-color:#f5f2f8;border-radius:10px;border:1px solid #ede9f3;">
              <p style="margin:0;font-size:14px;line-height:1.6;color:#404040;white-space:pre-wrap;">${escapeHtml(notes)}</p>
            </td>
          </tr>
        </table>`
    : "";

  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:20px;border:1px solid #ede9f3;border-radius:12px;background-color:#faf8f4;overflow:hidden;">
    <tr>
      <td style="padding:16px 18px;background-color:#3f2d62;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.06em;color:rgba(255,255,255,0.75);">Client</p>
        <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#ffffff;">${escapeHtml(data.clientName)}</p>
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
          ${detailRow("Phone", data.phone || "Not provided")}
          ${detailRow("Address", data.address)}
        </table>
        ${notesBlock}
      </td>
    </tr>
  </table>`;
}

export function buildBookingNotificationEmailHtml(data: BookingEmailData, adminUrl: string) {
  const body = `
    <p style="margin:0 0 8px;font-size:16px;line-height:1.6;color:#404040;">
      A client submitted a new care booking request.
    </p>
    <p style="margin:0;font-size:15px;line-height:1.6;color:#6b6560;">
      Review the details below and assign a caregiver in the admin portal.
    </p>
    ${bookingCard(data)}
    ${ctaButton("Review in admin portal", adminUrl)}`;

  return wrapEmailHtml({
    title: `New care booking request — ${data.clientName}`,
    preheader: `New care booking from ${data.clientName}`,
    headerBg: "#3f2d62",
    headline: "New care booking request",
    body,
  });
}

export function buildBookingNotificationEmailText(data: BookingEmailData) {
  return `A client submitted a new care booking request.

Client: ${data.clientName}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Address: ${data.address}
${data.careNotes?.trim() ? `\nCare notes:\n${data.careNotes.trim()}` : ""}

Review and assign a caregiver in the admin portal.`;
}
