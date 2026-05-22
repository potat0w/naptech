"use client";

import { useAuth } from "@/components/AuthProvider";
import SiteLogo from "@/components/SiteLogo";
import { headingFont } from "@/lib/auth/form-styles";
import { webAppBase } from "@/lib/app-urls";
import {
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
};

const caregiverNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Assigned Tasks", icon: ClipboardList },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/profile", label: "Profile", icon: User },
];

export default function PortalShell({ title, children }: { title: string; children: ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    void logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-surface-card bg-white transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-surface-card px-5 py-4">
          <Link href={caregiverNav[0].href} className="flex min-w-0 flex-col gap-1">
            <SiteLogo
              linked={false}
              className="h-9 w-auto max-w-[140px]"
              width={160}
              height={40}
            />
            <span className="text-xs font-medium text-muted">Care portal</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-muted hover:bg-surface-alt lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {caregiverNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand text-white shadow-sm"
                    : "text-body hover:bg-surface-alt"
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-surface-card p-4">
          <p className="truncate text-sm font-medium text-neutral-900">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="truncate text-xs text-muted">{user?.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-body transition-colors hover:bg-surface-alt"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close overlay"
        />
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-surface-card bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-xl border border-surface-card p-2 text-body hover:bg-surface-alt lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-brand">Care portal</p>
              <h1 className="text-lg font-normal text-neutral-900 sm:text-xl" style={headingFont}>
                {title}
              </h1>
            </div>
          </div>
          <a
            href={webAppBase()}
            className="hidden items-center gap-1.5 rounded-xl border border-surface-card px-3 py-2 text-sm text-body transition-colors hover:bg-surface-alt sm:flex"
          >
            <Home className="h-4 w-4" />
            Public site
          </a>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
