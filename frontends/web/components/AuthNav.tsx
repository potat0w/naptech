"use client";

import { useAuth } from "@/components/AuthProvider";
import { dashboardPathForRole, isExternalUrl } from "@/lib/portal/role";
import { btnPrimary } from "@/lib/layout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type AuthNavProps = {
  className?: string;
  buttonClassName?: string;
  onNavigate?: () => void;
  dropUp?: boolean;
};

function userInitials(firstName: string, lastName: string) {
  const first = firstName.trim().charAt(0).toUpperCase();
  const last = lastName.trim().charAt(0).toUpperCase();
  return `${first}${last}` || "?";
}

export default function AuthNav({
  className = "",
  buttonClassName = "",
  onNavigate,
  dropUp = false,
}: AuthNavProps) {
  const { user, ready, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  if (!ready) return null;

  if (user) {
    const profileHref = dashboardPathForRole(user.role);
    const initials = userInitials(user.firstName, user.lastName);

    return (
      <div ref={menuRef} className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white shadow-sm ring-2 ring-white transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={`Account menu for ${user.firstName} ${user.lastName}`}
        >
          {initials}
        </button>

        {open ? (
          <div
            role="menu"
            className={`absolute right-0 z-50 min-w-[11rem] overflow-hidden rounded-xl border border-neutral-100 bg-white py-1 shadow-xl shadow-neutral-900/10 ${
              dropUp ? "bottom-full mb-2" : "top-full mt-2"
            }`}
          >
            {isExternalUrl(profileHref) ? (
              <a
                role="menuitem"
                href={profileHref}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className="block px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-brand"
              >
                My profile
              </a>
            ) : (
              <Link
                role="menuitem"
                href={profileHref}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className="block px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-brand"
              >
                My profile
              </Link>
            )}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                logout();
                onNavigate?.();
              }}
              className="block w-full px-4 py-2.5 text-left text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-brand"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Link
      href="/signup?callbackUrl=/book"
      onClick={onNavigate}
      className={buttonClassName || `${btnPrimary} ${className}`}
    >
      Sign up
    </Link>
  );
}
