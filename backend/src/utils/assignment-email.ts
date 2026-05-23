import type { Assignment, AssignmentTask, User } from "@prisma/client";
import { dateOnlyToIso } from "./dates.js";
import {
  sendCaregiverCancelledAssignmentEmail,
  sendCaregiverNewAssignmentEmail,
  sendCaregiverRemovedFromAssignmentEmail,
  type AssignmentEmailDetails,
} from "./email.js";
import { emailConfigured } from "../config/env.js";

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
  if (!emailConfigured() || !caregiver.email) return;
  const result = await sendCaregiverNewAssignmentEmail(
    caregiver.email,
    toEmailDetails(assignment, caregiver)
  );
  if (!result.sent) {
    console.error(`New assignment email not sent → ${caregiver.email}`);
  }
}

export async function emailCaregiverRemovedFromAssignment(
  caregiver: User,
  assignment: AssignmentWithTasks
) {
  if (!emailConfigured() || !caregiver.email) return;
  const result = await sendCaregiverRemovedFromAssignmentEmail(
    caregiver.email,
    toEmailDetails(assignment, caregiver)
  );
  if (!result.sent) {
    console.error(`Assignment removal email not sent → ${caregiver.email}`);
  }
}

export async function emailCaregiverCancelledAssignment(
  caregiver: User,
  assignment: AssignmentWithTasks
) {
  if (!emailConfigured() || !caregiver.email) return;
  const result = await sendCaregiverCancelledAssignmentEmail(
    caregiver.email,
    toEmailDetails(assignment, caregiver)
  );
  if (!result.sent) {
    console.error(`Assignment cancellation email not sent → ${caregiver.email}`);
  }
}
