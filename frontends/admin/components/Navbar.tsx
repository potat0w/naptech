"use client";

import AuthNav from "@/components/AuthNav";
import MobileNav, { MobileHeaderActions, MobileNavTrigger } from "@/components/MobileNav";
import SiteLogo from "@/components/SiteLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { whatWeDoMenu } from "@/lib/nav-what-we-do";
import { slugify } from "@/lib/slugify";

const adviceAndCareLinks = [
  { label: "Advice & Support", href: "/advice-and-care" },
  { label: "News & Events", href: "/advice-and-care/news-events" },
  { label: "Cost Of Care", href: "/advice-and-care/cost-of-care" },
  { label: "FAQs", href: "/advice-and-care/faqs" },
  { label: "How To Age Well", href: "/advice-and-care/how-to-age-well" },
  { label: "Articles", href: "/advice-and-care/articles" },
] as const;

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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

export default function Navbar() {
  const pathname = usePathname();
  const onAuthPage = pathname === "/login" || pathname === "/signup";
  const isBookPage = pathname === "/book";
  const [hash, setHash] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const isWhatActive = useMemo(
    () => (pathname ?? "").startsWith("/what-we-do"),
    [pathname],
  );
  const isMeetTeamActive = useMemo(
    () => (pathname ?? "").startsWith("/why-us/our-team"),
    [pathname],
  );
  const isAdviceActive = useMemo(
    () => (pathname ?? "").startsWith("/advice-and-care"),
    [pathname],
  );
  const isProcessActive = useMemo(
    () => (pathname ?? "").startsWith("/how-it-works"),
    [pathname],
  );
  const linkBase =
    "text-xs font-semibold uppercase tracking-[0.14em] text-neutral-800 transition-colors duration-200 hover:text-[#3B2A8F]";
  const linkActive = "text-[#3B2A8F]";

  return (
    <header
      className={`relative sticky top-0 z-50 border-b border-neutral-100 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md shadow-neutral-900/10" : "shadow-none"
      }`}
    >
      <nav className="relative z-50 w-full" aria-label="Primary">
        <div className="relative mx-auto flex h-16 w-full items-center gap-3 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="relative z-10 flex min-w-0 items-center gap-3 sm:gap-4">
          <SiteLogo
            className="h-12 w-auto sm:h-[3.25rem]"
            width={96}
            height={96}
            priority
            onClick={closeMobile}
          />
        </div>

        <div className="hidden min-w-0 flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-8 xl:gap-10">
            <li className="group/what relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1 ${linkBase} ${
                  isWhatActive ? linkActive : ""
                }`}
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="naptec-menu-what-we-do"
              >
                What We Do
                <ChevronDown className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-hover/what:rotate-180" />
              </button>
              <div
                id="naptec-menu-what-we-do"
                role="menu"
                aria-label="What we do"
                className="pointer-events-none invisible absolute left-1/2 top-full z-50 min-w-[20rem] -translate-x-1/2 -translate-y-1 pt-4 opacity-0 transition-all duration-200 ease-out group-hover/what:pointer-events-auto group-hover/what:visible group-hover/what:translate-y-0 group-hover/what:opacity-100 group-focus-within/what:pointer-events-auto group-focus-within/what:visible group-focus-within/what:translate-y-0 group-focus-within/what:opacity-100"
              >
                <div className="rounded-2xl border border-neutral-100/80 bg-white px-5 py-5 shadow-xl shadow-neutral-900/[0.08]">
                  {whatWeDoMenu.map((section) => (
                    <div key={section.title}>
                      <Link
                        href={section.href}
                        className="block border-b border-neutral-100 pb-3 text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-[#3B2A8F] transition-colors hover:text-[#2d1f6d]"
                      >
                        {section.title}
                      </Link>
                      <ul className="mt-3 space-y-0.5">
                        {section.items.map((item) => (
                          <li key={item}>
                            <Link
                              href={`/what-we-do/${slugify(item)}`}
                              className="block rounded-lg px-3 py-2.5 text-[0.9375rem] leading-snug text-neutral-600 transition-colors hover:bg-brand/5 hover:text-[#3B2A8F]"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/why-us/our-team"
                className={`${linkBase} ${isMeetTeamActive ? linkActive : ""}`}
              >
                Meet team
              </Link>
            </li>

            <li>
              <Link
                href="/how-it-works"
                className={`${linkBase} ${isProcessActive ? linkActive : ""}`}
              >
                How It Works
              </Link>
            </li>

            {isBookPage ? (
              <li>
                <span className={`${linkBase} ${linkActive}`}>My account</span>
              </li>
            ) : null}

            <li className="group/advice relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1 ${linkBase} ${
                  isAdviceActive ? linkActive : ""
                }`}
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="naptec-menu-advice-care"
              >
                Advice & Care
                <ChevronDown className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-hover/advice:rotate-180" />
              </button>
              <div
                id="naptec-menu-advice-care"
                role="menu"
                aria-label="Advice and care"
                className="pointer-events-none invisible absolute right-0 top-full z-50 min-w-[16rem] -translate-y-1 pt-3 opacity-0 transition-all duration-200 ease-out group-hover/advice:pointer-events-auto group-hover/advice:visible group-hover/advice:translate-y-0 group-hover/advice:opacity-100 group-focus-within/advice:pointer-events-auto group-focus-within/advice:visible group-focus-within/advice:translate-y-0 group-focus-within/advice:opacity-100"
              >
                <div className="rounded-xl border border-neutral-100 bg-white p-2 shadow-xl shadow-neutral-900/10">
                  <ul className="py-1">
                    {adviceAndCareLinks.map((item) => (
                      <li key={item.href} role="none">
                        <Link
                          role="menuitem"
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-[#3B2A8F]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="relative z-10 ml-auto flex flex-none items-center gap-2 sm:gap-3 lg:gap-4">
          <span className="hidden lg:contents">
            <AuthNav />
          </span>
          <MobileHeaderActions />
          <MobileNavTrigger open={mobileOpen} onToggle={() => setMobileOpen((v) => !v)} />
        </div>
      </div>

      </nav>

      <MobileNav open={mobileOpen} onClose={closeMobile} />
    </header>
  );
}
