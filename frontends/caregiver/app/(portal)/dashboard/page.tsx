"use client";

import AssignmentCard from "@/components/portal/AssignmentCard";
import PortalShell from "@/components/portal/PortalShell";
import StatCard from "@/components/portal/StatCard";
import { fetchCaregiverAssignments, fetchCaregiverDashboard } from "@/lib/api/caregiver";
import { groupActiveAssignments, localTodayIso } from "@/lib/portal/assignment-dates";
import type { Assignment } from "@/lib/portal/types";
import { CalendarDays, CheckCircle2, ClipboardList, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function CaregiverDashboardPage() {
  const [stats, setStats] = useState({
    todayHomes: 0,
    upcoming: 0,
    activeVisits: 0,
    pendingReports: 0,
    completedReports: 0,
  });
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  const today = localTodayIso();

  useEffect(() => {
    Promise.all([fetchCaregiverDashboard(), fetchCaregiverAssignments()])
      .then(([dash, assign]) => {
        setStats({
          todayHomes: dash.stats.todayHomes,
          upcoming: dash.stats.upcoming,
          activeVisits: dash.stats.activeVisits ?? 0,
          pendingReports: dash.stats.pendingReports,
          completedReports: dash.stats.completedReports,
        });
        setAssignments(assign.assignments);
      })
      .finally(() => setLoading(false));
  }, []);

  const { active, dueToday, overdue, upcoming, later } = useMemo(
    () => groupActiveAssignments(assignments, today),
    [assignments, today]
  );

  const focusVisits = useMemo(
    () => [...overdue, ...dueToday].sort((a, b) => a.date.localeCompare(b.date)),
    [overdue, dueToday]
  );

  return (
    <PortalShell title="Dashboard">
      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Due today"
              value={stats.todayHomes}
              hint="Today or overdue"
              icon={CalendarDays}
            />
            <StatCard label="Upcoming" value={stats.upcoming} hint="Next 7 days" icon={Clock} />
            <StatCard label="Pending reports" value={stats.pendingReports} icon={FileText} />
            <StatCard label="Completed reports" value={stats.completedReports} icon={CheckCircle2} />
          </div>

          <section className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-neutral-900">Visits to focus on</h2>
              {active.length > 0 ? (
                <Link
                  href="/tasks"
                  className="text-sm font-medium text-brand hover:text-brand-dark"
                >
                  View all tasks
                </Link>
              ) : null}
            </div>

            {focusVisits.length > 0 ? (
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {focusVisits.map((a) => (
                  <AssignmentCard key={a.id} assignment={a} />
                ))}
              </div>
            ) : active.length > 0 ? (
              <p className="mt-4 text-sm text-muted">
                No visits due today. You have {active.length} upcoming home visit
                {active.length === 1 ? "" : "s"} below.
              </p>
            ) : (
              <p className="mt-4 text-sm text-muted">
                No active home visits assigned.{" "}
                <Link href="/tasks" className="font-medium text-brand hover:text-brand-dark">
                  Check assigned tasks
                </Link>
              </p>
            )}
          </section>

          {upcoming.length > 0 ? (
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-neutral-900">Upcoming (next 7 days)</h2>
              <ul className="mt-3 space-y-2">
                {upcoming.map((a) => (
                  <li
                    key={a.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-surface-card bg-white px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-neutral-900">{a.clientName}</span>
                    <span className="text-muted">
                      {a.date} · {a.shiftStart} – {a.shiftEnd}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {later.length > 0 ? (
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-neutral-900">Later schedules</h2>
              <ul className="mt-3 space-y-2">
                {later.map((a) => (
                  <li
                    key={a.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-surface-card bg-white px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-neutral-900">{a.clientName}</span>
                    <span className="flex items-center gap-2 text-muted">
                      <ClipboardList className="h-4 w-4 shrink-0 text-brand" />
                      {a.date} · {a.shiftStart} – {a.shiftEnd}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}
    </PortalShell>
  );
}
