"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type EnquireButtonProps = {
  children: ReactNode;
  className?: string;
  onBeforeOpen?: () => void;
};

export default function EnquireButton({
  children,
  className,
  onBeforeOpen,
}: EnquireButtonProps) {
  return (
    <Link href="/enquire" onClick={() => onBeforeOpen?.()} className={className}>
      {children}
    </Link>
  );
}
