"use client";

import {
  AssignmentStatusBadge,
  PriorityBadge,
} from "@/components/portal/badges";
import { formSelectClass } from "@/lib/auth/form-styles";
import type { Assignment, Caregiver } from "@/lib/portal/types";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type AssignmentCardProps = {
  assignment: Assignment;
  showCaregiver?: boolean;
  adminView?: boolean;
  showSubmitReport?: boolean;
  caregivers?: Caregiver[];
  onCancel?: (assignmentId: string) => void | Promise<void>;
  onReassign?: (assignmentId: string, caregiverUserId: string) => void | Promise<void>;
  actionPending?: boolean;
};

const MANAGEABLE_STATUSES = new Set<Assignment["status"]>(["scheduled", "in_progress"]);

export default function AssignmentCard({
  assignment,
  showCaregiver = false,
  adminView = false,
  showSubmitReport = false,
  caregivers = [],
  onCancel,
  onReassign,
  actionPending = false,
}: AssignmentCardProps) {
  const [reassignOpen, setReassignOpen] = useState(false);
  const [reassignTo, setReassignTo] = useState("");

  const canManage =
    adminView &&
    MANAGEABLE_STATUSES.has(assignment.status) &&
    (onCancel || onReassign);

  const reassignOptions = caregivers.filter(
    (c) => c.status === "active" && c.id !== assignment.caregiverId
  );

  return (
    <article
      className={`rounded-2xl border border-surface-card bg-white p-5 shadow-[0_8px_32px_-16px_rgba(63,45,98,0.15)] ${
        assignment.status === "cancelled" ? "opacity-60" : ""
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-neutral-900">{assignment.clientName}</h3>
          {showCaregiver ? (
            <p className="mt-0.5 text-sm text-muted">{assignment.caregiverName}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <PriorityBadge priority={assignment.priority} />
          <AssignmentStatusBadge status={assignment.status} />
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-body">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          {assignment.address}
        </p>
        <p className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-brand" />
          {assignment.date} · {assignment.shiftStart} – {assignment.shiftEnd}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Tasks</p>
        {assignment.tasks.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-2">
            {assignment.tasks.map((task) => (
              <li
                key={task}
                className="rounded-full bg-surface-alt px-3 py-1 text-xs text-body"
              >
                {task}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-sm text-muted">No tasks listed for this visit.</p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {!adminView && showSubmitReport ? (
          <Link
            href={`/caregiver/reports?assignment=${assignment.id}`}
            className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Submit report
          </Link>
        ) : null}

        {canManage && onCancel ? (
          <button
            type="button"
            disabled={actionPending}
            onClick={() => onCancel(assignment.id)}
            className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            Cancel from caregiver
          </button>
        ) : null}

        {canManage && onReassign ? (
          reassignOpen ? (
            <div className="flex w-full flex-wrap items-center gap-2">
              <select
                value={reassignTo}
                onChange={(e) => setReassignTo(e.target.value)}
                className={`${formSelectClass} min-w-[180px] flex-1`}
                disabled={actionPending}
              >
                <option value="" disabled>
                  New caregiver
                </option>
                {reassignOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName}
                  </option>
                ))}
              </select>
              <button
                type="button"
                disabled={actionPending || !reassignTo}
                onClick={async () => {
                  await onReassign(assignment.id, reassignTo);
                  setReassignOpen(false);
                  setReassignTo("");
                }}
                className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-50"
              >
                Confirm reassign
              </button>
              <button
                type="button"
                disabled={actionPending}
                onClick={() => {
                  setReassignOpen(false);
                  setReassignTo("");
                }}
                className="rounded-xl border border-surface-card px-4 py-2 text-sm font-medium text-body hover:bg-surface-alt disabled:opacity-50"
              >
                Back
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={actionPending || reassignOptions.length === 0}
              onClick={() => setReassignOpen(true)}
              className="rounded-xl border border-surface-card px-4 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-alt disabled:opacity-50"
            >
              Reassign to another caregiver
            </button>
          )
        ) : null}
      </div>
    </article>
  );
}
