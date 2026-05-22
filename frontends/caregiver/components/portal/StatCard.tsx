import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
};

export default function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white p-5 shadow-[0_8px_32px_-16px_rgba(63,45,98,0.18)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-neutral-900">{value}</p>
          {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}
