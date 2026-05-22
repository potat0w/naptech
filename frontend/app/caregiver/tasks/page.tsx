"use client";

import AssignmentCard from "@/components/portal/AssignmentCard";
import PortalShell from "@/components/portal/PortalShell";
import { fetchCaregiverAssignments, fetchReportableVisits } from "@/lib/api/caregiver";
import type { Assignment } from "@/lib/portal/types";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function CaregiverTasksPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [reportableIds, setReportableIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCaregiverAssignments(), fetchReportableVisits()])
      .then(([assignRes, visitsRes]) => {
        setAssignments(assignRes.assignments);
        setReportableIds(new Set(visitsRes.visits.map((v) => v.id)));
      })
      .finally(() => setLoading(false));
  }, []);

  const activeAssignments = useMemo(
    () => assignments.filter((a) => a.status !== "completed" && a.status !== "cancelled"),
    [assignments]
  );

  return (
    <PortalShell portal="caregiver" title="Tasks">
      <p className="text-sm text-muted">
        Your assigned home visits. Submit a report after each visit from the link below or from
        Reports.
      </p>
      {loading ? (
        <p className="mt-4 text-sm text-muted">Loading…</p>
      ) : activeAssignments.length === 0 ? (
        <p className="mt-4 text-sm text-muted">No active home visits assigned.</p>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {activeAssignments.map((a) => (
            <div key={a.id} className="space-y-2">
              <AssignmentCard assignment={a} />
              {reportableIds.has(a.id) ? (
                <Link
                  href={`/caregiver/reports?assignment=${a.id}`}
                  className="text-sm font-medium text-brand hover:text-brand-dark"
                >
                  Submit report for this home visit
                </Link>
              ) : a.status === "completed" ? (
                <p className="text-sm text-muted">Report submitted for this visit</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
