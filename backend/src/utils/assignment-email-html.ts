import type { AssignmentEmailDetails } from "./email.js";
import { ctaButton, detailRow, escapeHtml, wrapEmailHtml } from "./email-layout.js";

function tasksHtml(tasks: string[]) {
  if (tasks.length === 0) {
    return `<p style="margin:0;font-size:14px;line-height:1.5;color:#6b6560;">Standard visit tasks (see your portal).</p>`;
  }
  const items = tasks
    .map(
      (task, i) =>
        `<tr>
          <td style="padding:8px 0;vertical-align:top;width:28px;">
            <span style="display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;border-radius:50%;background-color:#ede9f3;color:#3f2d62;font-size:12px;font-weight:bold;">${i + 1}</span>
          </td>
          <td style="padding:8px 0;font-size:14px;line-height:1.5;color:#404040;">${escapeHtml(task)}</td>
        </tr>`
    )
    .join("");
  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation">${items}</table>`;
}

function visitCard(details: AssignmentEmailDetails) {
  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:20px;border:1px solid #ede9f3;border-radius:12px;background-color:#faf8f4;overflow:hidden;">
    <tr>
      <td style="padding:16px 18px;background-color:#3f2d62;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.06em;color:rgba(255,255,255,0.75);">Client</p>
        <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#ffffff;">${escapeHtml(details.clientName)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:4px 18px 16px;background-color:#ffffff;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          ${detailRow("Address", details.address)}
          ${detailRow("Date", details.date)}
          ${detailRow("Time", `${details.shiftStart} – ${details.shiftEnd}`)}
        </table>
        <p style="margin:16px 0 8px;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.04em;color:#6b6560;">Tasks</p>
        ${tasksHtml(details.tasks)}
      </td>
    </tr>
  </table>`;
}

export function buildNewAssignmentEmailHtml(
  details: AssignmentEmailDetails,
  portalUrl: string
) {
  const body = `
    <p style="margin:0 0 8px;font-size:16px;line-height:1.6;color:#404040;">
      Hello <strong style="color:#3f2d62;">${escapeHtml(details.caregiverName)}</strong>,
    </p>
    <p style="margin:0;font-size:15px;line-height:1.6;color:#6b6560;">
      You have been assigned a new home visit. Details are below.
    </p>
    ${visitCard(details)}
    ${ctaButton("View visit in portal", portalUrl)}`;

  return wrapEmailHtml({
    title: `New home visit — ${details.clientName}`,
    preheader: `New visit assigned: ${details.clientName} on ${details.date}`,
    headerBg: "#3f2d62",
    headline: "New home visit assigned",
    body,
  });
}

export function buildNewAssignmentEmailText(
  details: AssignmentEmailDetails,
  portalUrl: string
) {
  const tasks =
    details.tasks.length > 0
      ? details.tasks.map((task, i) => `${i + 1}. ${task}`).join("\n")
      : "Standard visit tasks (see your portal).";

  return `Hello ${details.caregiverName},

You have been assigned a new home visit.

Client: ${details.clientName}
Address: ${details.address}
Date: ${details.date}
Time: ${details.shiftStart} – ${details.shiftEnd}

Tasks:
${tasks}

View visit in portal: ${portalUrl}`;
}

export function buildRemovedAssignmentEmailHtml(details: AssignmentEmailDetails) {
  const body = `
    <p style="margin:0 0 8px;font-size:16px;line-height:1.6;color:#404040;">
      Hello <strong style="color:#3f2d62;">${escapeHtml(details.caregiverName)}</strong>,
    </p>
    <p style="margin:0;font-size:15px;line-height:1.6;color:#6b6560;">
      You are no longer assigned to this visit. It has been reassigned to another caregiver — you do not need to attend.
    </p>
    ${visitCard(details)}`;

  return wrapEmailHtml({
    title: `Visit reassigned — ${details.clientName}`,
    preheader: `Visit reassigned: ${details.clientName} on ${details.date}`,
    headerBg: "#503878",
    headline: "Visit reassigned",
    body,
  });
}

export function buildRemovedAssignmentEmailText(details: AssignmentEmailDetails) {
  return `Hello ${details.caregiverName},

You are no longer assigned to this visit. It has been reassigned to another caregiver — you do not need to attend.

Client: ${details.clientName}
Address: ${details.address}
Date: ${details.date}
Time: ${details.shiftStart} – ${details.shiftEnd}`;
}

export function buildCancelledAssignmentEmailHtml(details: AssignmentEmailDetails) {
  const body = `
    <p style="margin:0 0 8px;font-size:16px;line-height:1.6;color:#404040;">
      Hello <strong style="color:#3f2d62;">${escapeHtml(details.caregiverName)}</strong>,
    </p>
    <p style="margin:0;font-size:15px;line-height:1.6;color:#6b6560;">
      This home visit has been cancelled. You do not need to attend.
    </p>
    ${visitCard(details)}`;

  return wrapEmailHtml({
    title: `Visit cancelled — ${details.clientName}`,
    preheader: `Visit cancelled: ${details.clientName} on ${details.date}`,
    headerBg: "#503878",
    headline: "Visit cancelled",
    body,
  });
}

export function buildCancelledAssignmentEmailText(details: AssignmentEmailDetails) {
  return `Hello ${details.caregiverName},

This home visit has been cancelled. You do not need to attend.

Client: ${details.clientName}
Address: ${details.address}
Date: ${details.date}
Time: ${details.shiftStart} – ${details.shiftEnd}`;
}
