"use client";

import PortalShell from "@/components/portal/PortalShell";
import { formInputClass, formSelectClass } from "@/lib/auth/form-styles";
import { fetchInquiries } from "@/lib/api/admin";
import type { Inquiry } from "@/lib/portal/types";
import { ExternalLink, Mail, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type SortOption = "date-desc" | "date-asc" | "name-asc" | "subject-asc";

function sortInquiries(rows: Inquiry[], sort: SortOption): Inquiry[] {
  const sorted = [...rows];
  switch (sort) {
    case "date-asc":
      return sorted.sort((a, b) => a.date.localeCompare(b.date));
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "subject-asc":
      return sorted.sort((a, b) => a.subject.localeCompare(b.subject));
    default:
      return sorted.sort((a, b) => b.date.localeCompare(a.date));
  }
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("date-desc");

  useEffect(() => {
    fetchInquiries()
      .then((res) => setInquiries(res.inquiries))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = inquiries;
    if (q) {
      rows = rows.filter(
        (i) =>
          i.subject.toLowerCase().includes(q) ||
          i.name.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.message.toLowerCase().includes(q)
      );
    }
    return sortInquiries(rows, sort);
  }, [inquiries, query, sort]);

  return (
    <PortalShell title="Inquiries">
      <p className="mb-6 text-sm text-muted">
        View-only list. Reply manually from your email — no in-platform reply system.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative min-w-[200px] flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search inquiries…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${formInputClass} pl-10`}
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className={`${formSelectClass} w-auto min-w-[180px]`}
          aria-label="Sort inquiries"
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="name-asc">Name A–Z</option>
          <option value="subject-asc">Subject A–Z</option>
        </select>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-muted">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          {inquiries.length === 0
            ? "No inquiries yet."
            : "No inquiries match your search."}
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((inq) => (
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
