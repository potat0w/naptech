import type { Assignment, AssignmentTask, User } from "@prisma/client";
import { dateOnlyToIso } from "./dates.js";
import {
  sendCaregiverNewAssignmentEmail,
  sendCaregiverRemovedFromAssignmentEmail,
  type AssignmentEmailDetails,
} from "./email.js";
import { smtpConfigured } from "../config/env.js";

type AssignmentWithTasks = Assignment & { tasks: AssignmentTask[] };

function toEmailDetails(
  assignment: AssignmentWithTasks,
  caregiver: Pick<User, "firstName" | "lastName">
): AssignmentEmailDetails {
  return {
    caregiverName: `${caregiver.firstName} ${caregiver.lastName}`,
    clientName: assignment.clientDisplayName,
    address: assignment.serviceAddress,
    date: dateOnlyToIso(assignment.shiftDate),
    shiftStart: assignment.shiftStart,
    shiftEnd: assignment.shiftEnd,
    tasks: assignment.tasks
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((t) => t.description),
  };
}

export async function emailCaregiverNewAssignment(
  caregiver: User,
  assignment: AssignmentWithTasks
) {
  if (!smtpConfigured() || !caregiver.email) return;
  try {
    await sendCaregiverNewAssignmentEmail(
      caregiver.email,
      toEmailDetails(assignment, caregiver)
    );
  } catch (err) {
    console.error("Failed to send new assignment email:", err);
  }
}

export async function emailCaregiverRemovedFromAssignment(
  caregiver: User,
  assignment: AssignmentWithTasks
) {
  if (!smtpConfigured() || !caregiver.email) return;
  try {
    await sendCaregiverRemovedFromAssignmentEmail(
      caregiver.email,
      toEmailDetails(assignment, caregiver)
    );
  } catch (err) {
    console.error("Failed to send assignment removal email:", err);
  }
}
