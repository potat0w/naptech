import type {
  Assignment,
  AssignmentPriority,
  AssignmentStatus,
  AssignmentTask,
  CareFor,
  CareRequest,
  CareRequestStatus,
  RecruitmentExperience,
  RecruitmentPosition,
  ReportStatus,
  User,
  UserAddress,
} from "@prisma/client";

export function careForToApi(value: CareFor) {
  return value === "loved_one" ? "loved-one" : "me";
}

export function careForFromApi(value: string): CareFor {
  return value === "loved-one" ? "loved_one" : "self";
}

export function careRequestStatusToApi(status: CareRequestStatus) {
  if (status === "matched" || status === "assigned") return "matched";
  if (status === "pending") return "pending";
  return status;
}

export function assignmentStatusToApi(status: AssignmentStatus) {
  return status;
}

export function assignmentPriorityToApi(priority: AssignmentPriority) {
  return priority;
}

export function reportStatusToApi(status: ReportStatus) {
  return status;
}

export function positionFromApi(value: string): RecruitmentPosition {
  const map: Record<string, RecruitmentPosition> = {
    "part-time": "part_time",
    "full-time": "full_time",
    "live-in": "live_in",
  };
  return map[value] ?? "part_time";
}

export function experienceFromApi(value: string): RecruitmentExperience {
  return value as RecruitmentExperience;
}

export function deriveInquirySubject(message: string) {
  const line = message.trim().split("\n")[0] ?? "General enquiry";
  return line.length > 200 ? `${line.slice(0, 197)}...` : line || "General enquiry";
}

export function patientLabel(careFor: CareFor, firstName: string, lastName: string) {
  if (careFor === "self") return `${firstName} ${lastName}`;
  return "A loved one";
}

export type UserWithAddress = User & { address: UserAddress | null };

export type AssignmentWithRelations = Assignment & {
  tasks: AssignmentTask[];
  caregiver: User;
};

export type CareRequestWithUser = CareRequest & { user: User };
