"use client";

import { useAuth } from "@/components/AuthProvider";
import SiteLogo from "@/components/SiteLogo";
import { whatWeDoMenu } from "@/lib/nav-what-we-do";
import { dashboardPathForRole, roleLabel } from "@/lib/portal/role";
import { slugify } from "@/lib/slugify";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const adviceAndCareLinks = [
  { label: "Advice & Support", href: "/advice-and-care" },
  { label: "News & Events", href: "/advice-and-care/news-events" },
  { label: "Cost Of Care", href: "/advice-and-care/cost-of-care" },
  { label: "FAQs", href: "/advice-and-care/faqs" },
  { label: "How To Age Well", href: "/advice-and-care/how-to-age-well" },
  { label: "Articles", href: "/advice-and-care/articles" },
] as const;

const easeSmooth = "cubic-bezier(0.22, 1, 0.36, 1)";

const navRowClass =
  "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[1.125rem] font-medium tracking-tight text-neutral-900 transition-colors duration-300 active:bg-brand/10 hover:bg-brand/5";

const navRowActiveClass =
  "border-l-[3px] border-brand bg-brand/[0.07] pl-[calc(1rem-3px)] text-brand";

const subLinkClass =
  "block rounded-lg px-3 py-2.5 text-[0.9375rem] text-neutral-600 transition-colors active:bg-brand/10 hover:bg-brand/5 hover:text-brand";

function footerLinksForRole(role: "admin" | "caregiver" | "client" | undefined) {
  const links = [{ label: "Recruitment", href: "/recruitment" }];
  if (role === "admin") links.push({ label: "Admin portal", href: "/admin/dashboard" });
  else if (role === "caregiver") links.push({ label: "Caregiver portal", href: "/caregiver/dashboard" });
  else if (role === "client") links.push({ label: "Book care", href: "/book" });
  return links;
}

function userInitials(firstName: string, lastName: string) {
  const first = firstName.trim().charAt(0).toUpperCase();
  const last = lastName.trim().charAt(0).toUpperCase();
  return `${first}${last}` || "?";
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-[400ms] ${
        open ? "rotate-180 text-brand" : ""
      }`}
      style={{ transitionTimingFunction: easeSmooth, transitionDuration: "400ms" }}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavTrigger({
  open,
  onToggle,
  className = "",
}: {
  open: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200/80 bg-white text-neutral-800 shadow-sm transition-all duration-500 hover:bg-surface active:scale-95 lg:hidden ${className}`}
      style={{ transitionTimingFunction: easeSmooth }}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onToggle}
    >
      <span className="relative block h-3.5 w-5">
        <span
          className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition-all duration-500 ${
            open ? "translate-y-1.5 rotate-45" : ""
          }`}
          style={{ transitionTimingFunction: easeSmooth }}
        />
        <span
          className={`absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-current transition-all duration-500 ${
            open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
          }`}
          style={{ transitionTimingFunction: easeSmooth }}
        />
        <span
          className={`absolute left-0 top-3 h-0.5 w-full rounded-full bg-current transition-all duration-500 ${
            open ? "-translate-y-1.5 -rotate-45" : ""
          }`}
          style={{ transitionTimingFunction: easeSmooth }}
        />
      </span>
    </button>
  );
}

export function MobileHeaderActions({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/enquire"
      onClick={onNavigate}
      className="inline-flex min-h-9 items-center justify-center rounded-full bg-brand px-3.5 text-[11px] font-semibold text-white shadow-sm transition-all duration-500 hover:bg-brand-dark active:scale-[0.98] sm:min-h-10 sm:px-4 sm:text-xs lg:hidden"
      style={{ transitionTimingFunction: easeSmooth }}
    >
      Enquire
    </Link>
  );
}

function NavLink({
  href,
  active,
  onClose,
  children,
}: {
  href: string;
  active: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={`${navRowClass} ${active ? navRowActiveClass : ""}`}
    >
      {children}
    </Link>
  );
}

function AccordionSection({
  label,
  open,
  active,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  active: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <button
        type="button"
        className={`${navRowClass} ${active || open ? navRowActiveClass : ""}`}
        aria-expanded={open}
        onClick={onToggle}
      >
        {label}
        <Chevron open={open} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-[400ms] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        style={{ transitionTimingFunction: easeSmooth, transitionDuration: "400ms" }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-0.5 px-1 pb-2 pt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [accordion, setAccordion] = useState<"what" | "why" | "advice" | null>(null);
  const footerLinks = footerLinksForRole(user?.role);

  const path = pathname ?? "";

  useEffect(() => {
    if (!open) setAccordion(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[100] lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-neutral-900/45 backdrop-blur-[2px] transition-opacity duration-[400ms] ${
          open ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionTimingFunction: easeSmooth, transitionDuration: "400ms" }}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={`absolute inset-y-0 right-0 flex w-full max-w-[min(100%,22.5rem)] flex-col bg-surface shadow-[-8px_0_40px_-12px_rgba(63,45,98,0.18)] transition-transform duration-[450ms] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: easeSmooth, transitionDuration: "450ms" }}
        aria-label="Mobile navigation"
      >
        <header className="flex shrink-0 items-center justify-between bg-brand-deeper px-5 py-4">
          <SiteLogo
            className="h-10 w-auto sm:h-11"
            width={200}
            height={56}
            inverted
            onClick={onClose}
          />
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-brand-deeper transition-all duration-300 hover:bg-white active:scale-95"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </header>

        <nav
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5 sm:px-5"
          aria-label="Mobile"
        >
          <div className="space-y-1">
            <NavLink href="/" active={path === "/"} onClose={onClose}>
              Home
            </NavLink>

            <AccordionSection
              label="What we do"
              open={accordion === "what"}
              active={path.startsWith("/what-we-do")}
              onToggle={() => setAccordion((c) => (c === "what" ? null : "what"))}
            >
              {whatWeDoMenu.map((section) => (
                <div key={section.title} className="pt-1">
                  <Link
                    href={section.href}
                    onClick={onClose}
                    className="block px-3 py-2 text-sm font-medium text-brand"
                  >
                    {section.title}
                  </Link>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>
                        <Link
                          href={`/what-we-do/${slugify(item)}`}
                          onClick={onClose}
                          className={subLinkClass}
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </AccordionSection>

            <NavLink
              href="/why-us/our-team"
              active={path.startsWith("/why-us/our-team")}
              onClose={onClose}
            >
              Meet team
            </NavLink>

            <NavLink
              href="/how-it-works"
              active={path.startsWith("/how-it-works")}
              onClose={onClose}
            >
              How it works
            </NavLink>

            <AccordionSection
              label="Advice & care"
              open={accordion === "advice"}
              active={path.startsWith("/advice-and-care")}
              onToggle={() => setAccordion((c) => (c === "advice" ? null : "advice"))}
            >
              {adviceAndCareLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose} className={subLinkClass}>
                  {item.label}
                </Link>
              ))}
            </AccordionSection>

            <NavLink href="/enquire" active={path.startsWith("/enquire")} onClose={onClose}>
              Care enquiry
            </NavLink>
          </div>

          <div className="mt-8 rounded-2xl bg-surface-alt/80 px-4 py-4">
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted">
              More
            </p>
            <div className="flex flex-col gap-2">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-brand active:text-brand"
                >
                  {item.label}
                </Link>
              ))}
              {!user ? (
                <Link
                  href="/login"
                  onClick={onClose}
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-brand active:text-brand"
                >
                  Sign in
                </Link>
              ) : null}
            </div>
          </div>

          {user ? (
            <div className="mt-6 rounded-2xl bg-white p-4 shadow-[0_4px_20px_-8px_rgba(63,45,98,0.12)]">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                  {userInitials(user.firstName, user.lastName)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-neutral-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted">{roleLabel(user.role)} account</p>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                <Link
                  href={dashboardPathForRole(user.role)}
                  onClick={onClose}
                  className="flex min-h-11 items-center justify-center rounded-xl bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  My profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="flex min-h-11 w-full items-center justify-center rounded-xl border border-surface-card text-sm font-medium text-body transition-colors hover:bg-surface-alt"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : null}
        </nav>

        {!user ? (
          <div className="shrink-0 border-t border-neutral-200/40 bg-surface px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:px-5">
            <Link
              href="/signup?callbackUrl=/book"
              onClick={onClose}
              className="flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-brand text-[1.0625rem] font-semibold text-white shadow-[0_8px_28px_-8px_rgba(100,69,150,0.35)] transition-colors hover:bg-brand-dark active:scale-[0.99]"
            >
              Create account
            </Link>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
