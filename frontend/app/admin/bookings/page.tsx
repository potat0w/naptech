"use client";

import PortalShell from "@/components/portal/PortalShell";
import {
  formInputClass,
  formLabelClass,
  formSelectClass,
  formTextareaClass,
} from "@/lib/auth/form-styles";
import {
  fetchAdminBookings,
  fetchCaregivers,
  matchBookingToCaregiver,
} from "@/lib/api/admin";
import { ApiError } from "@/lib/api/client";
import type { AdminBooking, Caregiver } from "@/lib/portal/types";
import { Calendar, Mail, MapPin, Phone, User, X } from "lucide-react";
import { Suspense, useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

function defaultVisitDate(preferredDate: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (preferredDate) {
    const parsed = new Date(`${preferredDate}T12:00:00`);
    if (
      !Number.isNaN(parsed.getTime()) &&
      parsed >= today &&
      parsed.getFullYear() >= today.getFullYear()
    ) {
      return preferredDate;
    }
  }
  return today.toISOString().slice(0, 10);
}

const STATUS_FILTERS = [
  { value: "pending", label: "Pending" },
  { value: "", label: "All" },
  { value: "assigned", label: "Assigned" },
  { value: "completed", label: "Completed" },
] as const;

function statusLabel(status: AdminBooking["status"]) {
  const map: Record<AdminBooking["status"], string> = {
    pending: "Pending",
    matched: "Ready to assign",
    assigned: "Assigned",
    completed: "Completed",
    cancelled: "Cancelled",
  };
  return map[status] ?? status;
}

function statusClass(status: AdminBooking["status"]) {
  if (status === "pending" || status === "matched") {
    return "bg-amber-50 text-amber-800 ring-amber-100";
  }
  if (status === "assigned") return "bg-sky-50 text-sky-700 ring-sky-100";
  if (status === "completed") return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  return "bg-neutral-100 text-neutral-600 ring-neutral-200";
}

function AdminBookingsContent() {
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AdminBooking | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [b, c] = await Promise.all([
        fetchAdminBookings(filter || undefined),
        fetchCaregivers(),
      ]);
      setBookings(b.bookings);
      setCaregivers(c.caregivers);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load().catch(() => {});
  }, [load]);

  useEffect(() => {
    const openId = searchParams.get("open");
    if (!openId || bookings.length === 0) return;
    const booking = bookings.find((b) => b.id === openId);
    if (booking) {
      setSelected(booking);
      setAssignOpen(booking.canAssign);
    }
  }, [searchParams, bookings]);

  const visitDateDefault = useMemo(
    () => (selected ? defaultVisitDate(selected.preferredDate) : ""),
    [selected]
  );

  const handleAssign = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected) return;
    const formEl = e.currentTarget;
    setPending(true);
    setError(null);
    setNotice(null);
    const form = new FormData(formEl);
    const tasksRaw = String(form.get("tasks") ?? "");
    const tasks = tasksRaw
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      await matchBookingToCaregiver(selected.id, {
        caregiverUserId: String(form.get("caregiverUserId")),
        clientName: String(form.get("clientName")),
        serviceAddress: String(form.get("serviceAddress")),
        shiftDate: String(form.get("shiftDate")),
        shiftStart: String(form.get("shiftStart")),
        shiftEnd: String(form.get("shiftEnd")),
        priority: String(form.get("priority") || "medium"),
        tasks,
      });
      setNotice("Caregiver assigned. They will see this visit in their tasks.");
      setAssignOpen(false);
      setSelected(null);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to assign caregiver.");
    } finally {
      setPending(false);
    }
  };

  return (
    <PortalShell portal="admin" title="Booking requests">
      <p className="text-sm text-muted">
        Client care requests from the book care form. Assign a caregiver to create their visit
        tasks.
      </p>

      {notice ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {notice}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setFilter(item.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === item.value
                ? "bg-brand text-white"
                : "bg-surface-alt text-body hover:bg-surface-card"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-muted">Loading…</p>
      ) : bookings.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          {filter === "pending"
            ? "No pending booking requests."
            : "No booking requests match this filter."}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-surface-card bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-surface-alt/80 text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Care for</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Submitted</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-surface-card">
                  <td className="px-5 py-3">
                    <p className="font-medium text-neutral-900">{booking.clientName}</p>
                    <p className="text-xs text-muted">
                      {booking.firstName} {booking.lastName} · {booking.email}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-body">
                    {booking.careFor === "me" ? "Self" : "Loved one"}
                  </td>
                  <td className="px-5 py-3 text-body">{booking.city}</td>
                  <td className="px-5 py-3 text-muted">
                    {new Date(booking.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusClass(booking.status)}`}
                    >
                      {statusLabel(booking.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(booking);
                        setAssignOpen(false);
                        setError(null);
                      }}
                      className="text-sm font-medium text-brand hover:text-brand-dark"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={() => {
            setSelected(null);
            setAssignOpen(false);
            setError(null);
          }}
          role="presentation"
        >
          <div
            className="flex max-h-[min(92vh,820px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="booking-dialog-title"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-surface-card bg-surface-alt/40 px-6 py-5">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-brand">
                  {assignOpen ? "Assign caregiver" : "Booking request"}
                </p>
                <h3
                  id="booking-dialog-title"
                  className="mt-1 truncate text-xl font-semibold text-neutral-900"
                >
                  {selected.clientName}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Submitted{" "}
                  {new Date(selected.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  {" · "}
                  Care for {selected.careFor === "me" ? "self" : "a loved one"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusClass(selected.status)}`}
                >
                  {statusLabel(selected.status)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    setAssignOpen(false);
                    setError(null);
                  }}
                  className="rounded-lg p-2 text-muted transition-colors hover:bg-white hover:text-neutral-900"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              {!assignOpen ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-surface-card bg-surface-alt/30 p-4">
                    <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
                      <User className="h-3.5 w-3.5" />
                      Contact
                    </p>
                    <p className="mt-2 text-sm font-medium text-neutral-900">
                      {selected.firstName} {selected.lastName}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-body">
                      <Mail className="h-3.5 w-3.5 shrink-0 text-brand" />
                      {selected.email}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-body">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-brand" />
                      {selected.telephone || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-surface-card bg-surface-alt/30 p-4">
                    <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
                      <Calendar className="h-3.5 w-3.5" />
                      Preferred start
                    </p>
                    <p className="mt-2 text-sm text-body">
                      {selected.preferredDate &&
                      defaultVisitDate(selected.preferredDate) === selected.preferredDate
                        ? new Date(selected.preferredDate).toLocaleDateString("en-GB", {
                            weekday: "short",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Not specified — choose a date when assigning"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-surface-card bg-surface-alt/30 p-4 sm:col-span-2">
                    <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
                      <MapPin className="h-3.5 w-3.5" />
                      Service address
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-body">
                      {selected.serviceAddress}
                    </p>
                  </div>

                  {selected.careNotes ? (
                    <div className="rounded-xl border border-surface-card bg-surface-alt/30 p-4 sm:col-span-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted">
                        Care notes
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-body whitespace-pre-wrap">
                        {selected.careNotes}
                      </p>
                    </div>
                  ) : null}

                  {selected.assignedCaregiverName ? (
                    <div className="rounded-xl border border-brand/15 bg-brand/5 p-4 sm:col-span-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-brand">
                        Assigned caregiver
                      </p>
                      <p className="mt-2 text-sm font-medium text-neutral-900">
                        {selected.assignedCaregiverName}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <form
                  id="booking-assign-form"
                  key={selected.id}
                  onSubmit={handleAssign}
                  className="space-y-5"
                >
                  <p className="text-sm text-muted">
                    Schedule the home visit and choose who will deliver care. The caregiver
                    will see these tasks in their portal.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <span className={formLabelClass}>Caregiver *</span>
                      <select name="caregiverUserId" className={formSelectClass} required>
                        <option value="" disabled>
                          Select caregiver
                        </option>
                        {caregivers
                          .filter((c) => c.status === "active")
                          .map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.firstName} {c.lastName}
                            </option>
                          ))}
                      </select>
                    </label>

                    <input type="hidden" name="clientName" value={selected.clientName} />
                    <input
                      type="hidden"
                      name="serviceAddress"
                      value={selected.serviceAddress}
                    />

                    <label className="block">
                      <span className={formLabelClass}>Visit date *</span>
                      <input
                        type="date"
                        name="shiftDate"
                        className={formInputClass}
                        required
                        defaultValue={visitDateDefault}
                      />
                    </label>

                    <label className="block">
                      <span className={formLabelClass}>Priority</span>
                      <select name="priority" className={formSelectClass} defaultValue="medium">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className={formLabelClass}>Shift start *</span>
                      <input
                        type="time"
                        name="shiftStart"
                        className={formInputClass}
                        defaultValue="09:00"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className={formLabelClass}>Shift end *</span>
                      <input
                        type="time"
                        name="shiftEnd"
                        className={formInputClass}
                        defaultValue="11:00"
                        required
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className={formLabelClass}>Tasks (optional)</span>
                      <textarea
                        name="tasks"
                        rows={3}
                        className={formTextareaClass}
                        placeholder="One task per line. Leave blank for standard visit tasks."
                      />
                    </label>
                  </div>
                </form>
              )}

              {error ? (
                <p className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-surface-card bg-white px-6 py-4">
              {assignOpen ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setAssignOpen(false);
                      setError(null);
                    }}
                    className="rounded-xl border border-surface-card px-5 py-2.5 text-sm font-medium text-body hover:bg-surface-alt"
                  >
                    Back to details
                  </button>
                  <button
                    type="submit"
                    form="booking-assign-form"
                    disabled={pending}
                    className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
                  >
                    {pending ? "Assigning…" : "Confirm assignment"}
                  </button>
                </>
              ) : (
                <>
                  {selected.canAssign ? (
                    <button
                      type="button"
                      onClick={() => setAssignOpen(true)}
                      className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
                    >
                      Assign caregiver
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(null);
                      setAssignOpen(false);
                    }}
                    className="rounded-xl border border-surface-card px-5 py-2.5 text-sm font-medium text-body hover:bg-surface-alt"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </PortalShell>
  );
}

export default function AdminBookingsPage() {
  return (
    <Suspense fallback={<PortalShell portal="admin" title="Booking requests"><p className="text-sm text-muted">Loading…</p></PortalShell>}>
      <AdminBookingsContent />
    </Suspense>
  );
}
