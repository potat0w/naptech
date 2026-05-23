"use client";

import PortalShell from "@/components/portal/PortalShell";
import StatCard from "@/components/portal/StatCard";
import { ReportStatusBadge } from "@/components/portal/badges";
import {
  fetchAdminActivity,
  fetchAdminBookings,
  fetchAdminDashboard,
  fetchAdminReports,
} from "@/lib/api/admin";
import type { AdminBooking, CareReport } from "@/lib/portal/types";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Inbox,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 6;

function PaginationControls({
  page,
  totalPages,
  onPageChange,
  className = "border-t border-surface-card px-5 py-4",
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-end gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(0, page - 1))}
        disabled={page === 0}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-card text-neutral-700 transition-colors hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      </button>
      <p className="text-sm tabular-nums text-muted">
        {page + 1} of {totalPages}
      </p>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
        disabled={page >= totalPages - 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}

function paginate<T>(items: T[], page: number) {
  const start = page * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
}

function pageCount(count: number) {
  return Math.max(1, Math.ceil(count / PAGE_SIZE));
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    activeCaregivers: 0,
    activeAssignments: 0,
    totalReports: 0,
    pendingReports: 0,
    pendingBookings: 0,
  });
  const [activity, setActivity] = useState<
    { id: string; message: string; time: string; type: string }[]
  >([]);
  const [reports, setReports] = useState<CareReport[]>([]);
  const [pendingBookings, setPendingBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingsPage, setBookingsPage] = useState(0);
  const [activityPage, setActivityPage] = useState(0);
  const [reportsPage, setReportsPage] = useState(0);

  const paginatedBookings = useMemo(
    () => paginate(pendingBookings, bookingsPage),
    [pendingBookings, bookingsPage]
  );
  const paginatedActivity = useMemo(
    () => paginate(activity, activityPage),
    [activity, activityPage]
  );
  const paginatedReports = useMemo(
    () => paginate(reports, reportsPage),
    [reports, reportsPage]
  );

  useEffect(() => {
    Promise.all([
      fetchAdminDashboard(),
      fetchAdminActivity(),
      fetchAdminReports(),
      fetchAdminBookings("pending"),
    ])
      .then(([dash, act, reps, bookings]) => {
        setStats(dash.stats);
        setActivity(act.activity);
        setReports(reps.reports);
        setPendingBookings(bookings.bookings);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalShell title="Dashboard">
      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard
              label="Pending bookings"
              value={stats.pendingBookings}
              icon={Inbox}
            />
            <StatCard label="Total caregivers" value={stats.activeCaregivers} icon={Users} />
            <StatCard
              label="Active assignments"
              value={stats.activeAssignments}
              icon={CalendarDays}
            />
            <StatCard label="Submitted reports" value={stats.totalReports} icon={FileText} />
            <StatCard label="Pending reports" value={stats.pendingReports} icon={ClipboardList} />
          </div>

          <section className="mt-8 rounded-2xl border border-surface-card bg-white overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-card px-5 py-4">
              <h2 className="text-sm font-semibold text-neutral-900">Pending booking requests</h2>
              <Link
                href="/bookings"
                className="text-sm font-medium text-brand hover:text-brand-dark"
              >
                View all
              </Link>
            </div>
            {pendingBookings.length === 0 ? (
              <p className="px-5 py-6 text-sm text-muted">No pending client booking requests.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-surface-alt/80 text-muted">
                    <tr>
                      <th className="px-5 py-3 font-medium">Client</th>
                      <th className="px-5 py-3 font-medium">Location</th>
                      <th className="px-5 py-3 font-medium">Submitted</th>
                      <th className="px-5 py-3 font-medium" />
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBookings.map((booking) => (
                      <tr key={booking.id} className="border-t border-surface-card">
                        <td className="px-5 py-3 font-medium text-neutral-900">
                          {booking.clientName}
                        </td>
                        <td className="px-5 py-3 text-body">{booking.city}</td>
                        <td className="px-5 py-3 text-muted">
                          {new Date(booking.createdAt).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-5 py-3">
                          <Link
                            href={`/bookings?open=${booking.id}`}
                            className="text-sm font-medium text-brand hover:text-brand-dark"
                          >
                            Assign
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <PaginationControls
              page={bookingsPage}
              totalPages={pageCount(pendingBookings.length)}
              onPageChange={setBookingsPage}
            />
          </section>

          <div className="mt-8 rounded-2xl border border-surface-card bg-white p-5">
            <h2 className="text-sm font-semibold text-neutral-900">Recent activity</h2>
            <ul className="mt-4 space-y-3">
              {paginatedActivity.map((item) => (
                <li key={item.id} className="border-b border-surface-card pb-3 last:border-0">
                  <p className="text-sm text-body">{item.message}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {new Date(item.time).toLocaleString("en-GB")}
                  </p>
                </li>
              ))}
            </ul>
            <PaginationControls
              page={activityPage}
              totalPages={pageCount(activity.length)}
              onPageChange={setActivityPage}
              className="mt-4 border-t border-surface-card pt-4"
            />
          </div>

          <section className="mt-8 rounded-2xl border border-surface-card bg-white overflow-hidden">
            <div className="border-b border-surface-card px-5 py-4">
              <h2 className="text-sm font-semibold text-neutral-900">Recent reports</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-surface-alt/80 text-muted">
                  <tr>
                    <th className="px-5 py-3 font-medium">Caregiver</th>
                    <th className="px-5 py-3 font-medium">Client</th>
                    <th className="px-5 py-3 font-medium">Submitted</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReports.map((report) => (
                    <tr key={report.id} className="border-t border-surface-card">
                      <td className="px-5 py-3 text-neutral-900">{report.caregiverName}</td>
                      <td className="px-5 py-3 text-body">{report.clientName}</td>
                      <td className="px-5 py-3 text-muted">
                        {new Date(report.submittedAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-5 py-3">
                        <ReportStatusBadge status={report.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationControls
              page={reportsPage}
              totalPages={pageCount(reports.length)}
              onPageChange={setReportsPage}
            />
          </section>
        </>
      )}
    </PortalShell>
  );
}
