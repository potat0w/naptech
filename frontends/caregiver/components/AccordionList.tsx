"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

type AccordionListProps = {
  badge: string;
  items: AccordionItem[];
};

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

export default function AccordionList({ badge, items }: AccordionListProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && items.some((item) => item.id === hash)) {
      setOpenId(hash);
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [items]);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex justify-center">
        <p
          className="text-2xl font-medium text-[#3B2A8F] sm:text-3xl"
          style={serif}
        >
          {badge}
        </p>
      </div>

      <ul className="mt-12 border-t border-neutral-200">
        {items.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `${baseId}-${item.id}-panel`;
          const buttonId = `${baseId}-${item.id}-button`;

          return (
            <li key={item.id} id={item.id} className="scroll-mt-32 border-b border-neutral-200">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-start justify-between gap-6 py-8 text-left"
                >
                  <span
                    className="text-2xl font-normal leading-snug text-[#3B2A8F] sm:text-3xl lg:text-4xl"
                    style={serif}
                  >
                    {item.title}
                  </span>
                  <span
                    className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3B2A8F] text-2xl font-light leading-none text-white transition-transform duration-200"
                    aria-hidden
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="pb-8 pr-16 text-base leading-relaxed text-neutral-600 sm:text-lg"
              >
                {item.content}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
