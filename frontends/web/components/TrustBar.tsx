"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const stats = [
  { lead: "Compassionate Care, Delivered Daily", highlight: null, tail: null },
  { lead: "Trusted Support for Independent Living", highlight: null, tail: null },
  { lead: "Personalized Home Care for Every Family", highlight: null, tail: null },
  { lead: "Dedicated to Dignity, Comfort & Care", highlight: null, tail: null },
] as const;

function TrustStat({ item }: { item: (typeof stats)[number] }) {
  return (
    <p className="flex shrink-0 items-center whitespace-nowrap px-10 text-sm leading-snug text-white/95 sm:px-14 sm:text-[0.9375rem]">
      <span>{item.lead}</span>
      {item.highlight ? (
        <>
          {" "}
          <em className="text-base font-medium not-italic text-white sm:text-lg">
            {item.highlight}
          </em>
          {item.tail ? ` ${item.tail}` : null}
        </>
      ) : null}
      <span
        className="trust-bar-divider mx-6 shrink-0 text-white/40 sm:mx-10 sm:h-4 sm:w-px sm:bg-white/25 sm:text-transparent"
        aria-hidden
      >
        |
      </span>
    </p>
  );
}

export default function TrustBar() {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const items = [...stats, ...stats];

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const update = () => {
      setScrollOffset(el.scrollWidth / 2);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    document.fonts?.ready.then(update).catch(() => undefined);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const innerStyle: CSSProperties | undefined =
    scrollOffset > 0
      ? ({ "--trust-bar-offset": `${scrollOffset}px` } as CSSProperties)
      : undefined;

  return (
    <section
      className="overflow-hidden border-t border-white/10 bg-brand text-white"
      aria-label="Why families choose Naptec"
    >
      <div className="py-8 sm:py-10">
        <div className="trust-bar-track overflow-hidden">
          <div
            ref={innerRef}
            className={`trust-bar-inner${scrollOffset > 0 ? " is-ready" : ""}`}
            style={innerStyle}
          >
            {items.map((item, i) => (
              <TrustStat key={`${item.lead}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
