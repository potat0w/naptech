"use client";

import PortalShell from "@/components/portal/PortalShell";
import {
  formInputClass,
  formLabelClass,
  formErrorClass,
} from "@/lib/auth/form-styles";
import { createCaregiver, fetchCaregivers } from "@/lib/api/admin";
import { ApiError } from "@/lib/api/client";
import type { Caregiver } from "@/lib/portal/types";
import { Plus, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";

export default function AdminCaregiversPage() {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Caregiver | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdPassword, setCreatedPassword] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchCaregivers();
      setCaregivers(res.caregivers);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return caregivers;
    return caregivers.filter(
      (c) =>
        c.firstName.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }, [caregivers, query]);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setPending(true);
    setError(null);
    setCreatedPassword(null);
    const form = new FormData(formEl);
    const password = String(form.get("password") ?? "");

    try {
      await createCaregiver({
        firstName: String(form.get("firstName")),
        lastName: String(form.get("lastName")),
        email: String(form.get("email")),
        phone: String(form.get("phone")),
        password,
      });
      formEl.reset();
      setQuery("");
      setShowForm(false);
      setCreatedPassword(password);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create caregiver.");
    } finally {
      setPending(false);
    }
  };

  return (
    <PortalShell portal="admin" title="Caregivers">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative min-w-[200px] flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search caregivers…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${formInputClass} pl-10`}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v);
            setError(null);
            setCreatedPassword(null);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          <Plus className="h-4 w-4" />
          Add caregiver
        </button>
      </div>

      {createdPassword ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Caregiver created. They can sign in with the email and password you set.
        </p>
      ) : null}

      {showForm ? (
        <form
          onSubmit={handleCreate}
          className="mt-6 grid gap-4 rounded-2xl border border-surface-card bg-white p-5 sm:grid-cols-2"
        >
          {error ? (
            <p className={`${formErrorClass} sm:col-span-2`} role="alert">
              {error}
            </p>
          ) : null}
          <label className="block">
            <span className={formLabelClass}>First name *</span>
            <input type="text" name="firstName" className={formInputClass} required />
          </label>
          <label className="block">
            <span className={formLabelClass}>Last name *</span>
            <input type="text" name="lastName" className={formInputClass} required />
          </label>
          <label className="block sm:col-span-2">
            <span className={formLabelClass}>Email *</span>
            <input type="email" name="email" className={formInputClass} required />
          </label>
          <label className="block">
            <span className={formLabelClass}>Phone *</span>
            <input type="tel" name="phone" className={formInputClass} required />
          </label>
          <label className="block">
            <span className={formLabelClass}>Temporary password *</span>
            <input
              type="text"
              name="password"
              className={formInputClass}
              minLength={8}
              defaultValue="ChangeMe123!"
              required
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
            >
              {pending ? "Creating…" : "Create caregiver profile"}
            </button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <p className="mt-6 text-sm text-muted">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          {caregivers.length === 0
            ? "No caregivers yet. Add one with the button above."
            : "No caregivers match your search."}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-surface-card bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-alt/80 text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Assignments</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-surface-card">
                  <td className="px-5 py-3 font-medium text-neutral-900">
                    {c.firstName} {c.lastName}
                  </td>
                  <td className="px-5 py-3 text-body">{c.email}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        c.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-body">{c.activeAssignments}</td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      onClick={() => setSelected(c)}
                      className="text-sm font-medium text-brand hover:text-brand-dark"
                    >
                      View details
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <h3 className="text-lg font-semibold text-neutral-900">
              {selected.firstName} {selected.lastName}
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-muted">Email</dt>
                <dd className="text-body">{selected.email}</dd>
              </div>
              <div>
                <dt className="text-muted">Phone</dt>
                <dd className="text-body">{selected.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted">Reports completed</dt>
                <dd className="text-body">{selected.completedReports}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-6 w-full rounded-xl border border-surface-card px-4 py-2.5 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </PortalShell>
  );
}
