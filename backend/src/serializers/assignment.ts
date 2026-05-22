import type { Assignment, AssignmentTask, User } from "@prisma/client";
import { dateOnlyToIso } from "../utils/dates.js";
import {
  assignmentPriorityToApi,
  assignmentStatusToApi,
} from "../utils/mappers.js";

export function serializeAssignment(
  assignment: Assignment & { tasks: AssignmentTask[]; caregiver: User }
) {
  return {
    id: assignment.id,
    caregiverId: assignment.caregiverUserId,
    caregiverName: `${assignment.caregiver.firstName} ${assignment.caregiver.lastName}`,
    clientName: assignment.clientDisplayName,
    address: assignment.serviceAddress,
    date: dateOnlyToIso(assignment.shiftDate),
    shiftStart: assignment.shiftStart,
    shiftEnd: assignment.shiftEnd,
    tasks: assignment.tasks
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((t) => t.description),
    priority: assignmentPriorityToApi(assignment.priority),
    status: assignmentStatusToApi(assignment.status),
  };
}
