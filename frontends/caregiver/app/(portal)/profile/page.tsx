"use client";

import { useAuth } from "@/components/AuthProvider";
import PortalShell from "@/components/portal/PortalShell";
import { formInputClass, formLabelClass } from "@/lib/auth/form-styles";
import { fetchCaregiverAssignments, fetchCaregiverReports } from "@/lib/api/caregiver";
import { Mail, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function CaregiverProfilePage() {
  const { user, updateProfile } = useAuth();
  const [phone, setPhone] = useState("");
  const [activeCount, setActiveCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPhone(user?.phone ?? "");
  }, [user]);

  useEffect(() => {
    Promise.all([fetchCaregiverAssignments(), fetchCaregiverReports()]).then(
      ([assignments, reports]) => {
        setActiveCount(
          assignments.assignments.filter((a) =>
            ["scheduled", "in_progress", "pending_report"].includes(a.status)
          ).length
        );
        setReportCount(reports.reports.length);
      }
    );
  }, []);

  const handleSave = async () => {
    setPending(true);
    await updateProfile({ phone: phone.trim() });
    setPending(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PortalShell title="Profile">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-2xl border border-surface-card bg-white p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <User className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-sm text-muted">Caregiver · Naptec field team</p>
            </div>
          </div>

          <dl className="mt-6 space-y-4">
            <div>
              <dt className="flex items-center gap-2 text-sm text-muted">
                <Mail className="h-4 w-4" /> Email
              </dt>
              <dd className="mt-1 text-sm text-neutral-900">{user?.email}</dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-surface-card bg-white p-5 text-center">
            <p className="text-2xl font-semibold text-brand">{activeCount}</p>
            <p className="mt-1 text-sm text-muted">Active assignments</p>
          </div>
          <div className="rounded-2xl border border-surface-card bg-white p-5 text-center">
            <p className="text-2xl font-semibold text-brand">{reportCount}</p>
            <p className="mt-1 text-sm text-muted">Reports submitted</p>
          </div>
        </div>

        <form
          className="rounded-2xl border border-surface-card bg-white p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSave();
          }}
        >
          <h3 className="font-semibold text-neutral-900">Update contact details</h3>
          <label className="block">
            <span className={`${formLabelClass} flex items-center gap-2`}>
              <Phone className="h-4 w-4 text-brand" /> Phone
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={formInputClass}
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className={`rounded-xl px-5 py-2.5 text-sm font-medium text-white ${
              saved ? "bg-emerald-600" : "bg-brand hover:bg-brand-dark"
            } disabled:opacity-60`}
          >
            {pending ? "Saving…" : saved ? "Saved" : "Save changes"}
          </button>
        </form>
      </div>
    </PortalShell>
  );
}
