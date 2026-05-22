import { ReportStatusBadge } from "@/components/portal/badges";
import type { CareReport } from "@/lib/portal/types";

type ReportCardProps = {
  report: CareReport;
  onView?: () => void;
};

export default function ReportCard({ report, onView }: ReportCardProps) {
  const submitted = new Date(report.submittedAt).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <article className="rounded-2xl border border-surface-card bg-white p-5 shadow-[0_8px_32px_-16px_rgba(63,45,98,0.15)]">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-neutral-900">{report.clientName}</h3>
          <p className="mt-0.5 text-sm text-muted">{report.caregiverName}</p>
        </div>
        <ReportStatusBadge status={report.status} />
      </div>
      <p className="mt-3 text-sm text-body line-clamp-2">{report.preview}</p>
      <p className="mt-2 text-xs text-muted">Submitted {submitted}</p>
      {onView ? (
        <button
          type="button"
          onClick={onView}
          className="mt-4 rounded-xl border border-surface-card px-4 py-2 text-sm font-medium text-body hover:bg-surface-alt"
        >
          View full report
        </button>
      ) : null}
    </article>
  );
}
