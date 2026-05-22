"use client";

import PortalShell from "@/components/portal/PortalShell";
import ReportCard from "@/components/portal/ReportCard";
import ReportSubmission from "@/components/portal/ReportSubmission";
import {
  fetchCaregiverReports,
  fetchReportableVisits,
} from "@/lib/api/caregiver";
import type { Assignment, CareReport } from "@/lib/portal/types";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function ReportsContent() {
  const searchParams = useSearchParams();
  const assignmentId = searchParams.get("assignment");
  const [reportableVisits, setReportableVisits] = useState<Assignment[]>([]);
  const [myReports, setMyReports] = useState<CareReport[]>([]);
  const [selected, setSelected] = useState<CareReport | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([fetchReportableVisits(), fetchCaregiverReports()])
      .then(([visitsRes, reportsRes]) => {
        setReportableVisits(visitsRes.visits);
        setMyReports(reportsRes.reports);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const initialVisitId =
    assignmentId && reportableVisits.some((v) => v.id === assignmentId)
      ? assignmentId
      : assignmentId && loading
        ? assignmentId
        : null;

  return (
    <>
      <section className="rounded-2xl border border-surface-card bg-white p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Submit home visit report</h2>
        <p className="mt-1 text-sm text-muted">
          Reports are only for home visits assigned to you. Choose the visit, then describe the
          care you provided.
        </p>
        <div className="mt-6">
          {loading ? (
            <p className="text-sm text-muted">Loading your visits…</p>
          ) : (
            <ReportSubmission
              visits={reportableVisits}
              initialAssignmentId={initialVisitId}
              onSubmitted={load}
            />
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-neutral-900">Your submitted reports</h2>
        {myReports.length === 0 ? (
          <p className="mt-3 text-sm text-muted">
            Reports you submit for completed home visits will appear here.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {myReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onView={() => setSelected(report)}
              />
            ))}
          </div>
        )}
      </section>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <h3 className="text-lg font-semibold text-neutral-900">{selected.clientName}</h3>
            <p className="mt-1 text-sm text-muted">Home visit report</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-surface-alt p-4">
                <p className="text-xs font-medium uppercase text-muted">Your visit notes</p>
                <p className="mt-2 text-sm text-body">{selected.rawNotes}</p>
              </div>
              <div className="rounded-xl border border-brand/15 p-4">
                <p className="text-xs font-medium uppercase text-brand">Organised report</p>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-body">
                  {selected.organizedReport}
                </pre>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-6 rounded-xl border border-surface-card px-4 py-2 text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default function CaregiverReportsPage() {
  return (
    <PortalShell title="Reports">
      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
        <ReportsContent />
      </Suspense>
    </PortalShell>
  );
}
