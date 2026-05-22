"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const chromelessPaths = [
  "/signup",
  "/login",
  "/enquire",
  "/admin",
  "/caregiver",
  "/access-denied",
];

function isChromelessPath(pathname: string) {
  return chromelessPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideChrome = isChromelessPath(pathname);

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
