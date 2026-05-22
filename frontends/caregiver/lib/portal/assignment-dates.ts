import type { Assignment } from "@/lib/portal/types";

const ACTIVE_STATUSES = new Set<Assignment["status"]>([
  "scheduled",
  "in_progress",
  "pending_report",
]);

export function localTodayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDaysToIso(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isActiveAssignment(a: Assignment) {
  return ACTIVE_STATUSES.has(a.status);
}

export function groupActiveAssignments(assignments: Assignment[], today = localTodayIso()) {
  const weekEnd = addDaysToIso(today, 7);
  const active = assignments.filter(isActiveAssignment);

  const dueToday = active.filter((a) => a.date === today);
  const overdue = active.filter((a) => a.date < today);
  const upcoming = active
    .filter((a) => a.date > today && a.date <= weekEnd)
    .sort((a, b) => a.date.localeCompare(b.date));
  const later = active
    .filter((a) => a.date > weekEnd)
    .sort((a, b) => a.date.localeCompare(b.date));

  return { active, dueToday, overdue, upcoming, later };
}
