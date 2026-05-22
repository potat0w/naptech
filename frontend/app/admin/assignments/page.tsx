"use client";

import AssignmentCard from "@/components/portal/AssignmentCard";
import PortalShell from "@/components/portal/PortalShell";
import {
  formInputClass,
  formLabelClass,
  formSelectClass,
  formTextareaClass,
} from "@/lib/auth/form-styles";
import {
  cancelAssignment,
  createAssignment,
  fetchAssignments,
  fetchCaregivers,
  reassignAssignment,
} from "@/lib/api/admin";
import { ApiError } from "@/lib/api/client";
import { confirmDialog } from "@/lib/swal";
import type { Assignment, Caregiver } from "@/lib/portal/types";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";

export default function AdminAssignmentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [pending, setPending] = useState(false);
  const [actionPending, setActionPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [a, c] = await Promise.all([fetchAssignments(), fetchCaregivers()]);
    setAssignments(a.assignments);
    setCaregivers(c.caregivers);
  }, []);

  useEffect(() => {
    load().catch(() => {});
  }, [load]);

  const visibleAssignments = useMemo(() => {
    if (showCancelled) return assignments;
    return assignments.filter((a) => a.status !== "cancelled");
  }, [assignments, showCancelled]);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      await createAssignment({
        caregiverUserId: String(form.get("caregiverUserId")),
        clientName: String(form.get("clientName")),
        serviceAddress: String(form.get("serviceAddress")),
        shiftDate: String(form.get("shiftDate")),
        shiftStart: String(form.get("shiftStart")),
        shiftEnd: String(form.get("shiftEnd")),
        priority: String(form.get("priority") || "medium"),
        tasks,
      });
      formEl.reset();
      setShowForm(false);
      setNotice("Visit assigned. Only one caregiver can hold this visit at a time.");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create assignment.");
    } finally {
      setPending(false);
    }
  };

  const handleCancel = async (assignmentId: string) => {
    const confirmed = await confirmDialog({
      title: "Remove this visit?",
      text: "The caregiver will no longer see these tasks.",
      confirmText: "Yes, remove",
      cancelText: "Keep visit",
      icon: "warning",
    });
    if (!confirmed) return;
    setActionPending(true);
    setError(null);
    setNotice(null);
    try {
      await cancelAssignment(assignmentId);
      setNotice("Visit removed from caregiver.");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to cancel assignment.");
    } finally {
      setActionPending(false);
    }
  };

  const handleReassign = async (assignmentId: string, caregiverUserId: string) => {
    setActionPending(true);
    setError(null);
    setNotice(null);
    try {
      await reassignAssignment(assignmentId, caregiverUserId);
      setNotice("Visit reassigned to the new caregiver with the same tasks.");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to reassign visit.");
    } finally {
      setActionPending(false);
    }
  };

  return (
    <PortalShell portal="admin" title="Assignments">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl text-sm text-muted">
          Assign home visits to one caregiver at a time. If someone is on leave, cancel their visit
          or reassign it to another caregiver.
        </p>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v);
            setError(null);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          <Plus className="h-4 w-4" />
          New assignment
        </button>
      </div>

      {notice ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {notice}
        </p>
      ) : null}

      {error && !showForm ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      {showForm ? (
        <form
          onSubmit={handleCreate}
          className="mt-6 grid gap-4 rounded-2xl border border-surface-card bg-white p-5 sm:grid-cols-2"
        >
          {error ? (
            <p className="text-sm text-red-600 sm:col-span-2" role="alert">
              {error}
            </p>
          ) : null}
          <label className="block sm:col-span-2">
            <span className={formLabelClass}>Caregiver</span>
            <select name="caregiverUserId" className={formSelectClass} required defaultValue="">
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
          <label className="block sm:col-span-2">
            <span className={formLabelClass}>Home / client name</span>
            <input
              type="text"
              name="clientName"
              className={formInputClass}
              placeholder="Client name"
              required
            />
          </label>
          <label className="block sm:col-span-2">
            <span className={formLabelClass}>Address</span>
            <input
              type="text"
              name="serviceAddress"
              className={formInputClass}
              placeholder="Full address"
              required
            />
          </label>
          <label className="block">
            <span className={formLabelClass}>Date</span>
            <input type="date" name="shiftDate" className={formInputClass} required />
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
            <span className={formLabelClass}>Shift start</span>
            <input type="time" name="shiftStart" className={formInputClass} required />
          </label>
          <label className="block">
            <span className={formLabelClass}>Shift end</span>
            <input type="time" name="shiftEnd" className={formInputClass} required />
          </label>
          <label className="block sm:col-span-2">
            <span className={formLabelClass}>Tasks (one per line, optional)</span>
            <textarea
              name="tasks"
              rows={3}
              className={formTextareaClass}
              placeholder="Leave blank to use default tasks: medication, personal care, mobility, wellbeing"
            />
            <p className="mt-1 text-xs text-muted">
              If empty, standard visit tasks are added automatically for the caregiver.
            </p>
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
            >
              {pending ? "Creating…" : "Create assignment"}
            </button>
          </div>
        </form>
      ) : null}

      <label className="mt-6 flex items-center gap-2 text-sm text-body">
        <input
          type="checkbox"
          checked={showCancelled}
          onChange={(e) => setShowCancelled(e.target.checked)}
          className="rounded border-surface-card text-brand focus:ring-brand"
        />
        Show cancelled visits
      </label>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {visibleAssignments.map((a) => (
          <AssignmentCard
            key={a.id}
            assignment={a}
            showCaregiver
            adminView
            caregivers={caregivers}
            onCancel={handleCancel}
            onReassign={handleReassign}
            actionPending={actionPending}
          />
        ))}
      </div>

      {visibleAssignments.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          {showCancelled ? "No assignments yet." : "No active assignments."}
        </p>
      ) : null}
    </PortalShell>
  );
}
