"use client";

import PortalShell from "@/components/portal/PortalShell";
import { fetchInquiries } from "@/lib/api/admin";
import type { Inquiry } from "@/lib/portal/types";
import { ExternalLink, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries()
      .then((res) => setInquiries(res.inquiries))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalShell title="Inquiries">
      <p className="mb-6 text-sm text-muted">
        View-only list. Reply manually from your email — no in-platform reply system.
      </p>

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <article
              key={inq.id}
              className="rounded-2xl border border-surface-card bg-white p-5 shadow-[0_8px_32px_-16px_rgba(63,45,98,0.12)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-neutral-900">{inq.subject}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {inq.name} · {inq.email}
                  </p>
                </div>
                <time className="text-xs text-muted">{inq.date}</time>
              </div>
              <p className="mt-3 text-sm text-body line-clamp-3">{inq.message}</p>
              <a
                href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-surface-card px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-surface-alt"
              >
                <Mail className="h-4 w-4" />
                Open email app
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </a>
            </article>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
