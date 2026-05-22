"use client";

import EnquireContent from "@/components/EnquireContent";
import SiteLogo from "@/components/SiteLogo";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";

type EnquireContextValue = {
  open: boolean;
  openEnquire: () => void;
  closeEnquire: () => void;
};

const EnquireContext = createContext<EnquireContextValue | null>(null);

export function useEnquire() {
  const ctx = useContext(EnquireContext);
  if (!ctx) {
    throw new Error("useEnquire must be used within EnquireProvider");
  }
  return ctx;
}

function EnquireModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <header className="flex h-16 shrink-0 items-center bg-brand px-6 sm:px-10">
        <SiteLogo
          className="h-9 w-auto"
          width={160}
          height={44}
          inverted
          linked={false}
          priority
        />
        <button
          type="button"
          onClick={onClose}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10"
          aria-label="Close enquiry form"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <EnquireContent titleId={titleId} onClose={onClose} />
      </div>
    </div>
  );
}

export default function EnquireProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openEnquire = useCallback(() => setOpen(true), []);
  const closeEnquire = useCallback(() => setOpen(false), []);

  return (
    <EnquireContext.Provider value={{ open, openEnquire, closeEnquire }}>
      {children}
      <EnquireModal open={open} onClose={closeEnquire} />
    </EnquireContext.Provider>
  );
}
