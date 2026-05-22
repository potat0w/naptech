"use client";

import { submitCaregiverReport } from "@/lib/api/caregiver";
import { ApiError } from "@/lib/api/client";
import { formLabelClass, formSelectClass, formTextareaClass } from "@/lib/auth/form-styles";
import type { Assignment } from "@/lib/portal/types";
import { Copy, MapPin, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ReportSubmissionProps = {
  visits: Assignment[];
  initialAssignmentId?: string | null;
  onSubmitted?: () => void;
};

export default function ReportSubmission({
  visits,
  initialAssignmentId,
  onSubmitted,
}: ReportSubmissionProps) {
  const [selectedId, setSelectedId] = useState(initialAssignmentId ?? "");
  const [rawNotes, setRawNotes] = useState("");
  const [organized, setOrganized] = useState<string | null>(null);
  const [submittedNotes, setSubmittedNotes] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialAssignmentId) setSelectedId(initialAssignmentId);
  }, [initialAssignmentId]);

  const selectedVisit = useMemo(
    () => visits.find((v) => v.id === selectedId) ?? null,
    [visits, selectedId]
  );

  const handleGenerate = async () => {
    if (!rawNotes.trim() || !selectedId) return;

    setGenerating(true);
    setError(null);

    try {
      const { report } = await submitCaregiverReport({
        assignmentId: selectedId,
        rawNotes: rawNotes.trim(),
      });
      setSubmittedNotes(rawNotes.trim());
      setOrganized(report.organizedReport);
      setRawNotes("");
      setSelectedId("");
      onSubmitted?.();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to submit report. Please try again.");
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!organized) return;
    await navigator.clipboard.writeText(organized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (visits.length === 0) {
    return (
      <p className="rounded-xl border border-surface-card bg-surface-alt/50 px-4 py-4 text-sm text-muted">
        No home visits need a report right now. When you complete a visit from your tasks, it
        will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <label className="block">
        <span className={formLabelClass}>Home visit *</span>
        <select
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            setError(null);
            setOrganized(null);
          }}
          className={formSelectClass}
          required
        >
          <option value="" disabled>
            Select a visit you completed
          </option>
          {visits.map((v) => (
            <option key={v.id} value={v.id}>
              {v.clientName} — {v.date} ({v.shiftStart}–{v.shiftEnd})
            </option>
          ))}
        </select>
      </label>

      {selectedVisit ? (
        <div className="rounded-xl border border-surface-card bg-surface-alt/50 px-4 py-3 text-sm text-body">
          <p className="font-medium text-neutral-900">{selectedVisit.clientName}</p>
          <p className="mt-1 flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            {selectedVisit.address}
          </p>
          <p className="mt-1 text-muted">
            {selectedVisit.date} · {selectedVisit.shiftStart} – {selectedVisit.shiftEnd}
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-body">
          What you did on this home visit *
        </span>
        <textarea
          value={rawNotes}
          onChange={(e) => setRawNotes(e.target.value)}
          rows={5}
          disabled={!selectedId}
          placeholder="Describe the care you provided: medication, meals, mobility, mood, anything notable from the visit"
          className={formTextareaClass}
        />
      </label>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!rawNotes.trim() || generating || !selectedId}
        className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-50"
      >
        <Sparkles className="h-4 w-4" />
        {generating ? "Submitting…" : "Submit visit report"}
      </button>

      {organized ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-surface-card bg-surface-alt/50 p-4">
            <h3 className="text-sm font-semibold text-neutral-900">Your notes</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm text-body">{submittedNotes}</p>
          </div>
          <div className="rounded-2xl border border-brand/20 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-brand">Organised report</h3>
            <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-body">
              {organized}
            </pre>
          </div>
          <div className="flex flex-wrap gap-2 lg:col-span-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-xl border border-surface-card px-4 py-2 text-sm font-medium text-body hover:bg-surface-alt"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Copied" : "Copy report"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
