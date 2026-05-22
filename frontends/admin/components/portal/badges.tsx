import type { AssignmentStatus, Priority, ReportStatus } from "@/lib/portal/types";

const priorityStyles: Record<Priority, string> = {
  low: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  medium: "bg-amber-50 text-amber-800 ring-amber-100",
  high: "bg-rose-50 text-rose-700 ring-rose-100",
};

const assignmentStatusStyles: Record<AssignmentStatus, string> = {
  scheduled: "bg-sky-50 text-sky-700 ring-sky-100",
  in_progress: "bg-brand/10 text-brand ring-brand/15",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  pending_report: "bg-orange-50 text-orange-700 ring-orange-100",
  cancelled: "bg-neutral-100 text-neutral-600 ring-neutral-200",
};

const reportStatusStyles: Record<ReportStatus, string> = {
  pending: "bg-amber-50 text-amber-800 ring-amber-100",
  submitted: "bg-brand/10 text-brand ring-brand/15",
  reviewed: "bg-emerald-50 text-emerald-700 ring-emerald-100",
};

function Badge({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {label}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Badge label={priority} className={priorityStyles[priority]} />;
}

export function AssignmentStatusBadge({ status }: { status: AssignmentStatus }) {
  const labels: Record<AssignmentStatus, string> = {
    scheduled: "Scheduled",
    in_progress: "In progress",
    completed: "Completed",
    pending_report: "Pending report",
    cancelled: "Cancelled",
  };
  return <Badge label={labels[status]} className={assignmentStatusStyles[status]} />;
}

export function ReportStatusBadge({ status }: { status: ReportStatus }) {
  const labels: Record<ReportStatus, string> = {
    pending: "Pending",
    submitted: "Submitted",
    reviewed: "Reviewed",
  };
  return <Badge label={labels[status]} className={reportStatusStyles[status]} />;
}
