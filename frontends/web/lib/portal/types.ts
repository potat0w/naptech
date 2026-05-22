export type Priority = "low" | "medium" | "high";
export type AssignmentStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "pending_report"
  | "cancelled";
export type ReportStatus = "pending" | "submitted" | "reviewed";

export type Caregiver = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  activeAssignments: number;
  completedReports: number;
};

export type Assignment = {
  id: string;
  caregiverId: string;
  caregiverName: string;
  clientName: string;
  address: string;
  date: string;
  shiftStart: string;
  shiftEnd: string;
  tasks: string[];
  priority: Priority;
  status: AssignmentStatus;
};

export type CareReport = {
  id: string;
  assignmentId: string;
  caregiverId: string;
  caregiverName: string;
  clientName: string;
  submittedAt: string;
  rawNotes: string;
  organizedReport: string;
  status: ReportStatus;
  preview: string;
};

export type AdminBookingStatus =
  | "pending"
  | "matched"
  | "assigned"
  | "completed"
  | "cancelled";

export type AdminBooking = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  clientName: string;
  serviceAddress: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  careFor: "loved-one" | "me";
  preferredDate: string;
  careNotes: string;
  status: AdminBookingStatus;
  createdAt: string;
  assignedCaregiverId: string | null;
  assignedCaregiverName: string | null;
  canAssign: boolean;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
};

export type ActivityItem = {
  id: string;
  message: string;
  time: string;
  type: "assignment" | "report" | "caregiver";
};
