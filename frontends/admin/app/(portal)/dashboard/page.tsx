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
  BarChart3,
  CalendarDays,
  ClipboardList,
  FileText,
  Inbox,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
        setReports(reps.reports.slice(0, 10));
        setPendingBookings(bookings.bookings.slice(0, 8));
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
                    {pendingBookings.map((booking) => (
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
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-surface-card bg-white p-5 lg:col-span-2">
              <h2 className="text-sm font-semibold text-neutral-900">Reports overview</h2>
              <div className="mt-6 flex h-48 items-center justify-center rounded-xl border border-dashed border-surface-card bg-surface-alt/50">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <BarChart3 className="h-5 w-5 text-brand" />
                  Chart placeholder — connect analytics later
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-surface-card bg-white p-5">
              <h2 className="text-sm font-semibold text-neutral-900">Recent activity</h2>
              <ul className="mt-4 space-y-3">
                {activity.map((item) => (
                  <li key={item.id} className="border-b border-surface-card pb-3 last:border-0">
                    <p className="text-sm text-body">{item.message}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {new Date(item.time).toLocaleString("en-GB")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
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
                  {reports.map((report) => (
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
          </section>
        </>
      )}
    </PortalShell>
  );
}
